import StatsCards from "@/components/dashboard/StatsCards";
import ProgressGraph from "@/components/dashboard/ProgressGraph";
import RecentActivity from "@/components/dashboard/RecentActivity";

// TODO: Phase 4 — fetch real stats from DB via TanStack Query
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <StatsCards />
      <ProgressGraph />
      <RecentActivity />
    </div>
  );
}
