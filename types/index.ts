// Shared TypeScript types — expand as features are built

export type ApplicationStatus =
  | "APPLIED"
  | "INTERVIEW"
  | "ACCEPTED"
  | "REJECTED"
  | "NO_RESPONSE";

export interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  url?: string;
  status: ApplicationStatus;
  appliedAt: string;
  notes?: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  postedAt: string;
  url: string;
  source: "jsearch" | "adzuna" | "usajobs" | "scraper";
}

export interface UserProfile {
  degree?: string;
  graduationDate?: string;
  experience?: string;
  skills?: string;
  jobPreferences?: string;
  onboardingDone: boolean;
}
