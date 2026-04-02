const BASE_URL = "https://devtools.tech/questions/all";
const BASE_QUERY = new URLSearchParams({
  via: "manasi-dt",
  _data: "routes/questions/all",
});
const MAX_PAGES = Number.isFinite(Number(process.env.MAX_PAGES))
  ? Number(process.env.MAX_PAGES)
  : 500;

function ensureFetchAvailable() {
  if (typeof fetch === "function") {
    return fetch;
  }
  throw new Error(
    "fetch is not available globally. Run on Node.js 18+ or polyfill fetch (e.g. install node-fetch).",
  );
}

async function fetchPage(fetchImpl, pageNumber) {
  const query = new URLSearchParams(BASE_QUERY);
  query.set("page", String(pageNumber));
  const url = `${BASE_URL}?${query.toString()}`;

  const response = await fetchImpl(url, {
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed (status ${response.status}) while calling ${url}`);
  }

  return response.json();
}

function extractQuestions(payload) {
  if (!payload || typeof payload !== "object") return [];

  if (Array.isArray(payload.questions)) {
    return payload.questions;
  }

  const lists = payload.lists;
  if (lists && typeof lists === "object") {
    if (Array.isArray(lists.questions)) {
      return lists.questions;
    }

    if (lists.questions && typeof lists.questions === "object") {
      if (Array.isArray(lists.questions.data)) {
        return lists.questions.data;
      }
    }

    if (Array.isArray(lists.data)) {
      return lists.data;
    }

    const nestedObjectWithData = Object.values(lists).find(
      (entry) => entry && typeof entry === "object" && Array.isArray(entry.data),
    );
    if (nestedObjectWithData) {
      return nestedObjectWithData.data;
    }

    const arrayInLists = Object.values(lists).find(Array.isArray);
    if (arrayInLists) {
      return arrayInLists;
    }
  }

  return [];
}

function extractTotalPages(payload) {
  if (!payload || typeof payload !== "object") return null;

  if (Number.isFinite(payload.totalPages)) {
    return Number(payload.totalPages);
  }

  if (Number.isFinite(payload.total_pages)) {
    return Number(payload.total_pages);
  }

  const lists = payload.lists;
  if (lists && typeof lists === "object") {
    if (Number.isFinite(lists.totalPages)) {
      return Number(lists.totalPages);
    }
    if (Number.isFinite(lists.pageCount)) {
      return Number(lists.pageCount);
    }

    if (lists.questions && typeof lists.questions === "object") {
      const { totalPages: nestedTotalPages, total_pages: nestedTotalPagesAlt } =
        lists.questions;
      if (Number.isFinite(nestedTotalPages)) {
        return Number(nestedTotalPages);
      }
      if (Number.isFinite(nestedTotalPagesAlt)) {
        return Number(nestedTotalPagesAlt);
      }
    }

    const nestedObjectWithTotal = Object.values(lists).find((entry) => {
      if (!entry || typeof entry !== "object") return false;
      return (
        Number.isFinite(entry.totalPages) ||
        Number.isFinite(entry.total_pages) ||
        Number.isFinite(entry.pageCount)
      );
    });
    if (nestedObjectWithTotal) {
      if (Number.isFinite(nestedObjectWithTotal.totalPages)) {
        return Number(nestedObjectWithTotal.totalPages);
      }
      if (Number.isFinite(nestedObjectWithTotal.total_pages)) {
        return Number(nestedObjectWithTotal.total_pages);
      }
      if (Number.isFinite(nestedObjectWithTotal.pageCount)) {
        return Number(nestedObjectWithTotal.pageCount);
      }
    }
  }

  return null;
}

function extractNextPage(payload, currentPage) {
  const directNext = payload && (payload.nextPage ?? payload.next_page ?? payload.next);
  if (Number.isFinite(Number(directNext))) {
    return Number(directNext);
  }

  if (payload && typeof payload === "object") {
    if (payload.hasMore === false || payload.hasNextPage === false) {
      return null;
    }
    if (payload.hasMore === true || payload.hasNextPage === true) {
      return currentPage + 1;
    }
  }

  const lists = payload && payload.lists;
  if (lists && typeof lists === "object") {
    const listEntries = Object.values(lists);
    for (const entry of listEntries) {
      if (!entry || typeof entry !== "object") continue;
      const { nextPage, next_page, next, hasMore, hasNextPage } = entry;
      if (Number.isFinite(Number(nextPage ?? next_page ?? next))) {
        return Number(nextPage ?? next_page ?? next);
      }
      if (hasMore === false || hasNextPage === false) {
        return null;
      }
      if (hasMore === true || hasNextPage === true) {
        return currentPage + 1;
      }
    }
  }

  const totalPages = extractTotalPages(payload);
  if (totalPages && currentPage < totalPages) {
    return currentPage + 1;
  }

  return null;
}

(async () => {
  const fetchImpl = ensureFetchAvailable();
  const allQuestions = [];
  const visitedPages = new Set();

  for (let page = 1; ; ) {
    if (visitedPages.size >= MAX_PAGES) {
      console.warn(`Stopping because MAX_PAGES (${MAX_PAGES}) limit was reached.`);
      break;
    }

    if (visitedPages.has(page)) {
      console.warn(`Stopping because page ${page} was already visited.`);
      break;
    }
    visitedPages.add(page);

    const payload = await fetchPage(fetchImpl, page);
    const questions = extractQuestions(payload);

    if (!questions.length) {
      break;
    }

    allQuestions.push(...questions);

    const nextPage = extractNextPage(payload, page) || 20;
    if (Number.isFinite(nextPage) && nextPage > page) {
      page = nextPage;
      continue;
    }

    if (Number.isFinite(nextPage) && nextPage !== page) {
      if (!visitedPages.has(nextPage)) {
        page = nextPage;
        continue;
      }
    }

    const fallbackNext = page + 1;
    if (visitedPages.has(fallbackNext)) {
      break;
    }
    page = fallbackNext;
  }

  console.log(`Fetched ${allQuestions.length} questions.`);
  console.log(allQuestions);
})();
