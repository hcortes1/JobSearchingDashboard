import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="space-y-8 auth-panel">
      <div className="space-y-2">
        <p
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Welcome back
        </p>
        <h1
          className="text-3xl font-black tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Sign in
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your dashboard
        </p>
      </div>

      <LoginForm />
    </div>
  );
}
