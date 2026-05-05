import StatsCards from "@/components/dashboard/StatsCards";
import ProgressGraph from "@/components/dashboard/ProgressGraph";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Greeting */}
      <div className="mb-2">
        <h1
          className="text-2xl font-bold text-foreground tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Command Center
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Track your search. Own your outcome.
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 relative">
          <ProgressGraph />
        </div>
        <RecentActivity />
      </div>
    </div>
  );
}
