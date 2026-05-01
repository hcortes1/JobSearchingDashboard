import JobTrackerTable from "@/components/tracker/JobTrackerTable";

// TODO: Phase 6 — CRUD for job applications with optimistic updates
export default function TrackerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Job Tracker</h1>
      <JobTrackerTable />
    </div>
  );
}
