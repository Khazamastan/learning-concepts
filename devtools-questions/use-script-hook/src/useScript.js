import { useEffect, useState } from 'react';

const cache = new Map();

export function useScript(src, { async = true, defer = true } = {}) {
  const [status, setStatus] = useState(() => {
    if (!src) {
      return 'idle';
    }
    return cache.get(src)?.status ?? 'loading';
  });

  useEffect(() => {
    if (!src) {
      return undefined;
    }

    const cached = cache.get(src);
    if (cached?.status === 'ready') {
      setStatus('ready');
      return undefined;
    }
    if (cached?.status === 'error') {
      setStatus('error');
      return undefined;
    }

    let script = document.querySelector(`script[src="${src}"]`);
    let isNew = false;

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = async;
      script.defer = defer;
      isNew = true;
      cache.set(src, { status: 'loading' });
    }

    const handleLoad = () => {
      cache.set(src, { status: 'ready' });
      setStatus('ready');
    };

    const handleError = () => {
      cache.set(src, { status: 'error' });
      setStatus('error');
    };

    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);

    if (isNew) {
      document.body.appendChild(script);
    }

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
  }, [src, async, defer]);

  return status;
}
