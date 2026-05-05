export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-[1fr_1fr]">
      {/* Left: Brand panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-background relative overflow-hidden">
        {/* Dot grid texture */}
        <div className="absolute inset-0 bg-dot-grid opacity-50 pointer-events-none" />

        {/* Vertical rule on right edge */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-border to-transparent" />

        {/* Large dim monogram watermark */}
        <div
          className="absolute bottom-8 right-8 select-none pointer-events-none font-display font-black text-[220px] leading-none"
          style={{ color: "rgba(59,130,246,0.04)", fontFamily: "var(--font-display)" }}
        >
          PU
        </div>

        {/* Top: logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center shrink-0">
            <span
              className="text-primary-foreground font-black text-sm"
              style={{ fontFamily: "var(--font-display)" }}
            >
              P
</span>
          </div>
          <span
            className="font-black text-lg tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            PostUniJobFinder
          </span>
        </div>

        {/* Center: headline */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <p
              className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-medium"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Job search intelligence
            </p>
            <h2
              className="text-5xl font-black leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your job search,
              <br />
              <span className="text-shimmer">systematized.</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-base max-w-[340px] leading-relaxed">
            Track every application. Surface new opportunities. Land your next role — all in one ruthlessly focused dashboard.
          </p>
        </div>

        {/* Bottom: stats row */}
        <div className="relative z-10 grid grid-cols-3 gap-3">
          {[
            { value: "3", label: "Job APIs" },
            { value: "5", label: "Status stages" },
            { value: "4", label: "Phases shipped" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-border rounded-md p-3.5 bg-card/60 backdrop-blur-sm"
            >
              <p
                className="text-2xl font-bold text-primary leading-none"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {stat.value}
              </p>
              <p className="text-[11px] text-muted-foreground mt-1.5 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Form panel */}
      <div className="flex flex-col items-center justify-center p-8 bg-card min-h-screen lg:min-h-0 relative">
        {/* Mobile-only logo */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-7 h-7 bg-primary rounded-sm flex items-center justify-center">
            <span
              className="text-primary-foreground font-black text-xs"
              style={{ fontFamily: "var(--font-display)" }}
            >
              P
</span>
          </div>
          <span
            className="font-black text-base tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            PostUniJobFinder
          </span>
        </div>

        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
