import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="space-y-8 auth-panel">
      <div className="space-y-2">
        <p
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Get started
        </p>
        <h1
          className="text-3xl font-black tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Create account
        </h1>
        <p className="text-sm text-muted-foreground">
          Start tracking your job search today
        </p>
      </div>

      <RegisterForm />
    </div>
  );
}
