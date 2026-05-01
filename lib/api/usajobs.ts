// TODO: Phase 5 — USA Jobs API (free, government jobs)
// Docs: https://developer.usajobs.gov/

export interface USAJobsSearchParams {
  keyword: string;
  locationName?: string;
  positionTitle?: string;
  page?: number;
  resultsPerPage?: number;
}

export async function searchUSAJobs(params: USAJobsSearchParams) {
  // TODO: implement fetch with USAJOBS_AUTH_KEY + USAJOBS_USER_AGENT from env
  return { searchResult: { searchResultItems: [], searchResultCountAll: 0 } };
}
