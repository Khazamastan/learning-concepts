import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
};

const SUB_OPERATION_LIBRARY = [
  'Draft user intent',
  'Retrieve knowledge',
  'Synthesize response',
  'Safety review',
  'Stream completion'
];

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createId = (prefix) => `${prefix}-${Math.random().toString(16).slice(2, 10)}-${Date.now().toString(36)}`;

class AbortError extends Error {
  constructor(message = 'Chat run aborted') {
    super(message);
    this.name = 'AbortError';
  }
}

const sleep = (ms, signal) => new Promise((resolve, reject) => {
  if (signal?.aborted) {
    reject(new AbortError());
    return;
  }

  const timeout = setTimeout(() => {
    signal?.removeEventListener('abort', onAbort);
    resolve();
  }, ms);

  const onAbort = () => {
    clearTimeout(timeout);
    reject(new AbortError());
  };

  signal?.addEventListener('abort', onAbort, { once: true });
});

const initialiseSubOperations = (chatId, count) => {
  return Array.from({ length: count }).map((_, index) => ({
    id: createId(`${chatId}-step-${index + 1}`),
    name: SUB_OPERATION_LIBRARY[index % SUB_OPERATION_LIBRARY.length],
    durationMs: randomBetween(600, 2000),
    status: STATUS.PENDING,
    error: null
  }));
};

const createChat = ({ message, subOperationCount, failureChance }) => {
  const chatId = createId('chat');
  return {
    id: chatId,
    message,
    status: STATUS.PENDING,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    attemptCount: 0,
    failureChance,
    subOperationCount,
    subOperations: initialiseSubOperations(chatId, subOperationCount),
    lastError: null
  };
};

const cloneAndUpdate = (chat, updater) => {
  const draft = structuredClone(chat);
  updater(draft);
  draft.updatedAt = Date.now();
  return draft;
};

export const useChatQueue = () => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const abortControllers = useRef(new Map());
  const processingRef = useRef(false);
  const chatsRef = useRef([]);

  useEffect(() => {
    chatsRef.current = chats;
  }, [chats]);

  const updateChat = useCallback((chatId, updater) => {
    setChats((prev) => prev.map((chat) => {
      if (chat.id !== chatId) {
        return chat;
      }
      return cloneAndUpdate(chat, updater);
    }));
  }, []);

  const updateSubOperation = useCallback((chatId, subId, updater) => {
    updateChat(chatId, (draft) => {
      draft.subOperations = draft.subOperations.map((sub) => {
        if (sub.id !== subId) {
          return sub;
        }
        const copy = { ...sub };
        updater(copy);
        return copy;
      });
    });
  }, [updateChat]);

  const markRemainingAs = useCallback((chatId, status) => {
    updateChat(chatId, (draft) => {
      draft.subOperations = draft.subOperations.map((sub) => {
        if (sub.status === STATUS.COMPLETED) {
          return sub;
        }
        return { ...sub, status, error: status === STATUS.FAILED ? sub.error : null };
      });
    });
  }, [updateChat]);

  const runChat = useCallback(async (chatId) => {
    const controller = new AbortController();
    abortControllers.current.set(chatId, controller);

    updateChat(chatId, (draft) => {
      draft.status = STATUS.PROCESSING;
      draft.attemptCount += 1;
      draft.lastError = null;
      draft.startedAt = Date.now();
      draft.completedAt = null;
      draft.subOperations = draft.subOperations.map((sub) => ({
        ...sub,
        status: sub.status === STATUS.COMPLETED ? STATUS.PENDING : sub.status,
        error: null,
        durationMs: randomBetween(600, 2000)
      }));
    });

    const signal = controller.signal;

    try {
      for (const sub of chatsRef.current.find((item) => item.id === chatId)?.subOperations ?? []) {
        updateSubOperation(chatId, sub.id, (draft) => {
          draft.status = STATUS.PROCESSING;
        });

        await sleep(sub.durationMs, signal);

        const currentChat = chatsRef.current.find((item) => item.id === chatId);
        if (!currentChat) {
          throw new Error('Chat missing during processing');
        }

        const shouldFail = Math.random() < currentChat.failureChance;
        if (shouldFail) {
          const failureMessage = 'Synthetic failure injected for interview scenario';
          updateSubOperation(chatId, sub.id, (draft) => {
            draft.status = STATUS.FAILED;
            draft.error = failureMessage;
          });
          updateChat(chatId, (draft) => {
            draft.status = STATUS.FAILED;
            draft.lastError = failureMessage;
          });
          markRemainingAs(chatId, STATUS.PENDING);
          throw new Error(failureMessage);
        }

        updateSubOperation(chatId, sub.id, (draft) => {
          draft.status = STATUS.COMPLETED;
          draft.error = null;
        });
      }

      updateChat(chatId, (draft) => {
        draft.status = STATUS.COMPLETED;
        draft.completedAt = Date.now();
      });
    } catch (error) {
      if (error instanceof AbortError || error.name === 'AbortError') {
        updateChat(chatId, (draft) => {
          draft.status = STATUS.CANCELLED;
          draft.lastError = 'Operation aborted by user';
        });
        markRemainingAs(chatId, STATUS.CANCELLED);
      }
    } finally {
      abortControllers.current.delete(chatId);
      setActiveChatId(null);
      processingRef.current = false;
    }
  }, [markRemainingAs, updateChat, updateSubOperation]);

  const processNext = useCallback(() => {
    if (processingRef.current) {
      return;
    }

    const nextChat = chatsRef.current.find((chat) => chat.status === STATUS.PENDING);
    if (!nextChat) {
      return;
    }

    processingRef.current = true;
    setActiveChatId(nextChat.id);
    runChat(nextChat.id).catch((error) => {
      console.error('Chat processing error', error);
      processingRef.current = false;
    }).finally(() => {
      setTimeout(() => {
        processNext();
      }, 0);
    });
  }, [runChat]);

  useEffect(() => {
    processNext();
  }, [processNext, chats]);

  const addChat = useCallback(({ message, subOperationCount, failureChance }) => {
    const chat = createChat({ message, subOperationCount, failureChance });
    setChats((prev) => [...prev, chat]);
  }, []);

  const abortChat = useCallback((chatId) => {
    const controller = abortControllers.current.get(chatId);
    if (controller) {
      controller.abort();
    }
  }, []);

  const retryChat = useCallback((chatId) => {
    const target = chatsRef.current.find((chat) => chat.id === chatId);
    if (!target) {
      return;
    }

    setChats((prev) => prev.map((chat) => {
      if (chat.id !== chatId) {
        return chat;
      }

      const reset = { ...chat };
      reset.status = STATUS.PENDING;
      reset.subOperations = initialiseSubOperations(chatId, target.subOperationCount);
      reset.lastError = null;
      reset.startedAt = null;
      reset.completedAt = null;
      return reset;
    }));
  }, []);

  const metrics = useMemo(() => {
    const totals = chats.reduce((acc, chat) => {
      acc[chat.status] = (acc[chat.status] ?? 0) + 1;
      return acc;
    }, {});

    return {
      total: chats.length,
      pending: totals[STATUS.PENDING] ?? 0,
      processing: totals[STATUS.PROCESSING] ?? 0,
      completed: totals[STATUS.COMPLETED] ?? 0,
      failed: totals[STATUS.FAILED] ?? 0,
      cancelled: totals[STATUS.CANCELLED] ?? 0
    };
  }, [chats]);

  return {
    chats,
    addChat,
    abortChat,
    retryChat,
    activeChatId,
    metrics,
    STATUS
  };
};
