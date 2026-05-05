"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import NumberTicker from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: number;
  description: string;
  accentColor: string;
  beamFrom: string;
  beamTo: string;
  featured?: boolean;
}

const stats: Stat[] = [
  {
    label: "Applied",
    value: 0,
    description: "Total applications sent",
    accentColor: "border-l-[var(--status-applied)]",
    beamFrom: "#3B82F6",
    beamTo: "#93C5FD",
    featured: true,
  },
  {
    label: "Interview",
    value: 0,
    description: "Currently in process",
    accentColor: "border-l-[var(--status-interview)]",
    beamFrom: "#8B5CF6",
    beamTo: "#C4B5FD",
  },
  {
    label: "Accepted",
    value: 0,
    description: "Offers received",
    accentColor: "border-l-[var(--status-accepted)]",
    beamFrom: "#34D399",
    beamTo: "#6EE7B7",
  },
  {
    label: "Rejected",
    value: 0,
    description: "Closed — keep going",
    accentColor: "border-l-[var(--status-rejected)]",
    beamFrom: "#F87171",
    beamTo: "#FCA5A5",
  },
  {
    label: "No Reply",
    value: 0,
    description: "Awaiting response",
    accentColor: "border-l-[var(--status-no-response)]",
    beamFrom: "#6B7280",
    beamTo: "#9CA3AF",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "relative overflow-hidden rounded-lg bg-card border border-border border-l-2 p-4",
            "transition-all duration-200 hover:border-border/80 hover:bg-card/80",
            stat.accentColor
          )}
        >
          {stat.featured && (
            <BorderBeam
              size={60}
              duration={8}
              colorFrom={stat.beamFrom}
              colorTo={stat.beamTo}
              borderWidth={1}
            />
          )}

          <p
            className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {stat.label}
          </p>

          <div
            className="text-3xl font-bold text-foreground leading-none mb-1"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {stat.value > 0 ? (
              <NumberTicker value={stat.value} />
            ) : (
              <span className="text-muted-foreground/60">0</span>
            )}
          </div>

          <p className="text-[11px] text-muted-foreground mt-1.5 leading-tight">
            {stat.description}
          </p>
        </div>
      ))}
    </div>
  );
}
