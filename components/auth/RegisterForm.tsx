"use client";
// TODO: Phase 2 — React Hook Form + Zod + Bcrypt + Resend email verification
export default function RegisterForm() {
  return (
    <form className="space-y-4">
      <input type="email" placeholder="Email" className="w-full border rounded px-3 py-2" disabled />
      <input type="text" placeholder="Username" className="w-full border rounded px-3 py-2" disabled />
      <input type="password" placeholder="Password" className="w-full border rounded px-3 py-2" disabled />
      <input type="password" placeholder="Confirm password" className="w-full border rounded px-3 py-2" disabled />
      <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded" disabled>
        Create account
      </button>
    </form>
  );
}
