"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const PLACEHOLDER_DATA = [
  { week: "W1", applied: 0, interviews: 0 },
  { week: "W2", applied: 0, interviews: 0 },
  { week: "W3", applied: 0, interviews: 0 },
  { week: "W4", applied: 0, interviews: 0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <p className="text-[11px] text-muted-foreground mb-1">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-xs font-medium" style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
};

export default function ProgressGraph() {
  return (
    <div className="rounded-lg bg-card border border-border p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2
            className="text-sm font-semibold text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Application Progress
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Weekly applications and interviews over time
          </p>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            Applied
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
            Interviews
          </span>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={PLACEHOLDER_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="appliedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="interviewGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.14 0.005 260)"
              vertical={false}
            />
            <XAxis
              dataKey="week"
              tick={{ fill: "oklch(0.48 0.005 260)", fontSize: 11, fontFamily: "var(--font-mono)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "oklch(0.48 0.005 260)", fontSize: 11, fontFamily: "var(--font-mono)" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="applied"
              stroke="#F59E0B"
              strokeWidth={2}
              fill="url(#appliedGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#F59E0B", strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="interviews"
              stroke="#38BDF8"
              strokeWidth={2}
              fill="url(#interviewGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#38BDF8", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {PLACEHOLDER_DATA.every(d => d.applied === 0) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-xs text-muted-foreground/60 bg-card px-3 py-1.5 rounded-md border border-border">
            Data will appear as you log applications
          </p>
        </div>
      )}
    </div>
  );
}
