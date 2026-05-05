"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerSchema, type RegisterInput } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema), mode: "onTouched" });

  async function onSubmit(data: RegisterInput) {
    setServerError({});

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const { error } = await res.json();
      setServerError(
        Object.fromEntries(
          Object.entries(error).map(([k, v]) => [k, (v as string[])[0]])
        )
      );
      return;
    }

    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setServerError({ form: "Account created but sign-in failed. Please log in." });
      router.push("/login");
      return;
    }

    router.push("/onboarding");
  }

  const inputClass =
    "bg-background border-border/70 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/15 placeholder:text-muted-foreground/40 h-10";

  const labelClass =
    "block text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-medium";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5 auth-field" style={{ animationDelay: "0.05s" }}>
        <label htmlFor="email" className={labelClass} style={{ fontFamily: "var(--font-mono)" }}>
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className={inputClass}
          {...register("email")}
        />
        {(errors.email || serverError.email) && (
          <p className="text-xs text-destructive">
            {errors.email?.message ?? serverError.email}
          </p>
        )}
      </div>

      <div className="space-y-1.5 auth-field" style={{ animationDelay: "0.1s" }}>
        <label htmlFor="username" className={labelClass} style={{ fontFamily: "var(--font-mono)" }}>
          Username
        </label>
        <Input
          id="username"
          type="text"
          placeholder="your-username"
          className={inputClass}
          {...register("username")}
        />
        {(errors.username || serverError.username) && (
          <p className="text-xs text-destructive">
            {errors.username?.message ?? serverError.username}
          </p>
        )}
      </div>

      <div className="space-y-1.5 auth-field" style={{ animationDelay: "0.15s" }}>
        <label htmlFor="password" className={labelClass} style={{ fontFamily: "var(--font-mono)" }}>
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className={inputClass}
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1.5 auth-field" style={{ animationDelay: "0.2s" }}>
        <label htmlFor="confirmPassword" className={labelClass} style={{ fontFamily: "var(--font-mono)" }}>
          Confirm password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          className={inputClass}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="auth-field pt-1" style={{ animationDelay: "0.25s" }}>
        <Button
          type="submit"
          className="w-full h-10 font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account…" : "Create account"}
        </Button>
      </div>

      <p
        className="auth-field text-center text-xs text-muted-foreground border-t border-border pt-4"
        style={{ animationDelay: "0.3s" }}
      >
        Already have an account?{" "}
        <a href="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
          Sign in
        </a>
      </p>
    </form>
  );
}
