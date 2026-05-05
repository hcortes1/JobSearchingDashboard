"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginInput) {
    setServerError("");
    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setServerError("Invalid username or password");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5 auth-field" style={{ animationDelay: "0.05s" }}>
        <label
          htmlFor="username"
          className="block text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-medium"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Username
        </label>
        <Input
          id="username"
          type="text"
          placeholder="your_username"
          className="bg-background border-border/70 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/15 placeholder:text-muted-foreground/40 h-10"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-xs text-destructive">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-1.5 auth-field" style={{ animationDelay: "0.1s" }}>
        <label
          htmlFor="password"
          className="block text-[11px] uppercase tracking-[0.12em] text-muted-foreground font-medium"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className="bg-background border-border/70 focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/15 placeholder:text-muted-foreground/40 h-10"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-xs text-destructive text-center py-1">{serverError}</p>
      )}

      <div className="auth-field pt-1" style={{ animationDelay: "0.15s" }}>
        <Button
          type="submit"
          className="w-full h-10 font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </div>

      <div className="auth-field flex justify-between text-xs text-muted-foreground pt-1" style={{ animationDelay: "0.2s" }}>
        <a href="#" className="hover:text-foreground transition-colors">Forgot username?</a>
        <a href="#" className="hover:text-foreground transition-colors">Forgot password?</a>
      </div>

      <p className="auth-field text-center text-xs text-muted-foreground border-t border-border pt-4" style={{ animationDelay: "0.25s" }}>
        No account?{" "}
        <a href="/register" className="text-primary hover:text-primary/80 transition-colors font-medium">
          Create one
        </a>
      </p>
    </form>
  );
}
