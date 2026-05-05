import { cn } from "@/lib/utils";

export type AppStatus = "APPLIED" | "INTERVIEW" | "ACCEPTED" | "REJECTED" | "NO_RESPONSE";

export const STATUS_CONFIG: Record<AppStatus, { label: string; dot: string; text: string; bg: string }> = {
  APPLIED:     { label: "Applied",     dot: "bg-[var(--status-applied)]",     text: "text-[var(--status-applied)]",     bg: "bg-[var(--status-applied)]/10" },
  INTERVIEW:   { label: "Interview",   dot: "bg-[var(--status-interview)]",   text: "text-[var(--status-interview)]",   bg: "bg-[var(--status-interview)]/10" },
  ACCEPTED:    { label: "Accepted",    dot: "bg-[var(--status-accepted)]",    text: "text-[var(--status-accepted)]",    bg: "bg-[var(--status-accepted)]/10" },
  REJECTED:    { label: "Rejected",    dot: "bg-[var(--status-rejected)]",    text: "text-[var(--status-rejected)]",    bg: "bg-[var(--status-rejected)]/10" },
  NO_RESPONSE: { label: "No Response", dot: "bg-[var(--status-no-response)]", text: "text-[var(--status-no-response)]", bg: "bg-[var(--status-no-response)]/10" },
};

export default function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status as AppStatus] ?? STATUS_CONFIG.NO_RESPONSE;
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-widest", cfg.bg, cfg.text)}
      style={{ fontFamily: "var(--font-display)" }}>
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", cfg.dot)} />
      {cfg.label}
    </span>
  );
}
