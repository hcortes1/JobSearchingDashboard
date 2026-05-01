// TODO: Phase 5 — Adzuna API (free tier)
// Docs: https://developer.adzuna.com/

export interface AdzunaSearchParams {
  what: string;
  where?: string;
  page?: number;
  resultsPerPage?: number;
}

export async function searchAdzuna(params: AdzunaSearchParams) {
  // TODO: implement fetch with ADZUNA_APP_ID + ADZUNA_API_KEY from env
  return { results: [], count: 0 };
}
