"use client";

import { Briefcase, CheckCircle2, Clock, MessageSquare, XCircle } from "lucide-react";

type Status = "APPLIED" | "INTERVIEW" | "ACCEPTED" | "REJECTED" | "NO_RESPONSE";

const STATUS_CONFIG: Record<Status, { label: string; icon: React.ElementType; color: string }> = {
  APPLIED:      { label: "Applied",    icon: Briefcase,      color: "text-[#F59E0B]" },
  INTERVIEW:    { label: "Interview",  icon: MessageSquare,  color: "text-[#38BDF8]" },
  ACCEPTED:     { label: "Accepted",   icon: CheckCircle2,   color: "text-[#34D399]" },
  REJECTED:     { label: "Rejected",   icon: XCircle,        color: "text-[#F87171]" },
  NO_RESPONSE:  { label: "No Reply",   icon: Clock,          color: "text-muted-foreground" },
};

// Placeholder — Phase 6 will replace with real data from TanStack Query
const EMPTY_STATE = true;

export default function RecentActivity() {
  return (
    <div className="rounded-lg bg-card border border-border p-5">
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-sm font-semibold text-foreground tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Recent Activity
        </h2>
        <span className="text-[11px] text-muted-foreground px-2 py-0.5 rounded-md bg-secondary border border-border">
          Last 30 days
        </span>
      </div>

      {EMPTY_STATE ? (
        <div className="flex flex-col items-center justify-center py-10 gap-3">
          <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">No applications yet</p>
            <p className="text-xs text-muted-foreground mt-1">
              Start tracking in the{" "}
              <a href="/tracker" className="text-primary hover:underline">Tracker</a>
              {" "}or search for{" "}
              <a href="/jobs" className="text-primary hover:underline">Jobs</a>
            </p>
          </div>
        </div>
      ) : (
        <ol className="relative space-y-3 border-l border-border ml-2">
          {/* Populated by Phase 6 */}
        </ol>
      )}
    </div>
  );
}
