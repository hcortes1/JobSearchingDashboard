"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import { GraduationCap, Calendar, Briefcase, Target, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

const schema = z.object({
  degree: z.string().min(2, "Please enter your degree"),
  graduationDate: z.string().min(4, "Please enter your graduation date"),
  experience: z.string().min(10, "Please describe your experience (min 10 chars)"),
  skills: z.string().optional(),
  jobPreferences: z.string().min(3, "Please enter your target role"),
});
type FormData = z.infer<typeof schema>;

const STEPS = [
  {
    id: 1,
    title: "Your Degree",
    subtitle: "What did you study?",
    icon: GraduationCap,
    field: "degree" as const,
    placeholder: "e.g. B.S. Computer Science",
    type: "text",
  },
  {
    id: 2,
    title: "Graduation Date",
    subtitle: "When did or will you graduate?",
    icon: Calendar,
    field: "graduationDate" as const,
    placeholder: "e.g. May 2025 or 2026",
    type: "text",
  },
  {
    id: 3,
    title: "Experience & Projects",
    subtitle: "Briefly describe your relevant background",
    icon: Briefcase,
    field: "experience" as const,
    placeholder: "e.g. 2 internships in full-stack dev, built 3 personal projects...",
    type: "textarea",
  },
  {
    id: 4,
    title: "Target Role",
    subtitle: "What kind of job are you hunting for?",
    icon: Target,
    field: "jobPreferences" as const,
    placeholder: "e.g. Software Engineer, AI/ML roles, fintech internships",
    type: "text",
  },
];

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onTouched" });

  const current = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  async function goNext() {
    const valid = await trigger(current.field);
    if (valid) setStep((s) => s + 1);
  }

  async function onSubmit(data: FormData) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setDone(true);
        setTimeout(() => router.push("/dashboard"), 1800);
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-card border border-border p-10 text-center">
        <BorderBeam colorFrom="#F59E0B" colorTo="#34D399" duration={4} />
        <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-primary" />
        </div>
        <h2
          className="text-xl font-bold text-foreground mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Profile complete!
        </h2>
        <p className="text-sm text-muted-foreground">Redirecting to your dashboard…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span
            className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Step {step + 1} of {STEPS.length}
          </span>
          <span
            className="text-[11px] text-primary font-medium"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step indicator dots */}
      <div className="flex gap-2">
        {STEPS.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              "flex-1 h-0.5 rounded-full transition-all duration-300",
              i <= step ? "bg-primary" : "bg-secondary"
            )}
          />
        ))}
      </div>

      {/* Step card */}
      <div className="relative overflow-hidden rounded-xl bg-card border border-border p-6">
        {step === STEPS.length - 1 && (
          <BorderBeam colorFrom="#F59E0B" colorTo="#38BDF8" duration={6} />
        )}

        {/* Icon + title */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <current.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2
              className="text-base font-bold text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {current.title}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">{current.subtitle}</p>
          </div>
        </div>

        {/* Field */}
        <div className="space-y-1.5">
          {current.type === "textarea" ? (
            <textarea
              {...register(current.field)}
              placeholder={current.placeholder}
              rows={4}
              className={cn(
                "w-full rounded-md border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none transition",
                "border-border"
              )}
            />
          ) : (
            <Input
              {...register(current.field)}
              type={current.type}
              placeholder={current.placeholder}
              className="bg-secondary border-border focus:ring-primary focus:border-primary"
            />
          )}
          {errors[current.field] && (
            <p className="text-xs text-destructive">{errors[current.field]?.message}</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {step > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep((s) => s - 1)}
            className="flex-1 border-border bg-secondary hover:bg-card gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        )}

        {step < STEPS.length - 1 ? (
          <Button
            type="button"
            onClick={goNext}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          >
            {submitting ? "Saving…" : "Complete Setup"}
            {!submitting && <CheckCircle2 className="w-4 h-4" />}
          </Button>
        )}
      </div>
    </form>
  );
}
