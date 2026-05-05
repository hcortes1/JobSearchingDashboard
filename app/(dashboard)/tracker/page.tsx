import JobTrackerTable from "@/components/tracker/JobTrackerTable";

export default function TrackerPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}>
          Tracker
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Every application in one log. Update status inline.
        </p>
      </div>
      <JobTrackerTable />
    </div>
  );
}
