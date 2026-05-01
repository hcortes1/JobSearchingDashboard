// TODO: Phase 5 — JSearch API via RapidAPI
// Docs: https://rapidapi.com/letscrape-6bRBa3QguO5/api/jsearch

export interface JobSearchParams {
  query: string;
  location?: string;
  jobType?: "FULLTIME" | "PARTTIME" | "CONTRACTOR" | "INTERN";
  datePosted?: "all" | "today" | "3days" | "week" | "month";
  page?: number;
}

export async function searchJobs(params: JobSearchParams) {
  // TODO: implement fetch to JSearch API with RAPIDAPI_KEY from env
  return { jobs: [], total: 0 };
}
