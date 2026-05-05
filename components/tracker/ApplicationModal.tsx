"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobApplicationSchema, type JobApplicationInput } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { Loader2, X } from "lucide-react";
import { STATUS_CONFIG, type AppStatus } from "./StatusBadge";

interface ApplicationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: JobApplicationInput) => Promise<void>;
  initialValues?: Partial<JobApplicationInput>;
  mode: "add" | "edit";
}

const STATUSES = Object.entries(STATUS_CONFIG) as [AppStatus, (typeof STATUS_CONFIG)[AppStatus]][];

const inputClass = cn(
  "w-full px-3 py-2 text-sm rounded-md",
  "bg-background border border-border text-foreground placeholder:text-muted-foreground/50",
  "focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
);

const labelClass = "block text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-1.5";

export default function ApplicationModal({ open, onClose, onSubmit, initialValues, mode }: ApplicationModalProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<JobApplicationInput>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: { status: "APPLIED", ...initialValues },
  });

  useEffect(() => {
    if (open) reset({ status: "APPLIED", ...initialValues });
  }, [open, initialValues, reset]);

  if (!open) return null;

  async function onValid(data: JobApplicationInput) {
    await onSubmit(data);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-md mx-4 bg-card border border-border rounded-lg shadow-2xl shadow-black/40">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-sm font-bold uppercase tracking-widest text-foreground"
            style={{ fontFamily: "var(--font-display)" }}>
            {mode === "add" ? "Log Application" : "Edit Application"}
          </h2>
          <button onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onValid)} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelClass} style={{ fontFamily: "var(--font-mono)" }}>Job Title</label>
              <input {...register("jobTitle")} placeholder="Software Engineer" className={inputClass} />
              {errors.jobTitle && <p className="mt-1 text-xs text-destructive">{errors.jobTitle.message}</p>}
            </div>

            <div>
              <label className={labelClass} style={{ fontFamily: "var(--font-mono)" }}>Company</label>
              <input {...register("company")} placeholder="Acme Corp" className={inputClass} />
              {errors.company && <p className="mt-1 text-xs text-destructive">{errors.company.message}</p>}
            </div>

            <div>
              <label className={labelClass} style={{ fontFamily: "var(--font-mono)" }}>Status</label>
              <select {...register("status")} className={cn(inputClass, "cursor-pointer")}>
                {STATUSES.map(([value, cfg]) => (
                  <option key={value} value={value}>{cfg.label}</option>
                ))}
              </select>
              {errors.status && <p className="mt-1 text-xs text-destructive">{errors.status.message}</p>}
            </div>

            <div className="col-span-2">
              <label className={labelClass} style={{ fontFamily: "var(--font-mono)" }}>URL <span className="normal-case tracking-normal text-muted-foreground/50">(optional)</span></label>
              <input {...register("url")} placeholder="https://jobs.example.com/..." className={inputClass} />
              {errors.url && <p className="mt-1 text-xs text-destructive">{errors.url.message}</p>}
            </div>

            <div className="col-span-2">
              <label className={labelClass} style={{ fontFamily: "var(--font-mono)" }}>Notes <span className="normal-case tracking-normal text-muted-foreground/50">(optional)</span></label>
              <textarea {...register("notes")} placeholder="Recruiter name, interview details, follow-up needed..."
                rows={3}
                className={cn(inputClass, "resize-none")} />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground border border-border rounded-md hover:text-foreground hover:border-border/80 transition-colors"
              style={{ fontFamily: "var(--font-display)" }}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-widest bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              style={{ fontFamily: "var(--font-display)" }}>
              {isSubmitting && <Loader2 className="w-3 h-3 animate-spin" />}
              {mode === "add" ? "Log it" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
