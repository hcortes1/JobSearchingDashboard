"use client";
// TODO: Phase 2 — React Hook Form + Zod validation + NextAuth signIn()
export default function LoginForm() {
  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Username"
        className="w-full border rounded px-3 py-2"
        disabled
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border rounded px-3 py-2"
        disabled
      />
      <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded" disabled>
        Sign in
      </button>
      <div className="flex justify-between text-sm text-muted-foreground">
        <a href="#">Forgot username?</a>
        <a href="#">Forgot password?</a>
      </div>
    </form>
  );
}
