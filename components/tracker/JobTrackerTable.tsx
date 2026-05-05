"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Pencil, Trash2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { STATUS_CONFIG, type AppStatus } from "./StatusBadge";
import ApplicationModal from "./ApplicationModal";
import type { JobApplicationInput } from "@/lib/validations";

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  url: string | null;
  status: string;
  notes: string | null;
  appliedAt: string;
}

async function fetchApplications(): Promise<Application[]> {
  const res = await fetch("/api/applications");
  if (!res.ok) throw new Error("Failed to load applications");
  return res.json();
}

function SkeletonRow({ i }: { i: number }) {
  return (
    <tr className="border-b border-border/50">
      <td className="px-4 py-3"><div className="h-2.5 w-4 bg-secondary rounded animate-pulse" /></td>
      <td className="px-4 py-3"><div className={cn("h-2.5 bg-secondary rounded animate-pulse", i % 2 === 0 ? "w-36" : "w-28")} /></td>
      <td className="px-4 py-3"><div className="h-2.5 w-24 bg-secondary/70 rounded animate-pulse" /></td>
      <td className="px-4 py-3"><div className="h-5 w-20 bg-secondary/50 rounded animate-pulse" /></td>
      <td className="px-4 py-3"><div className="h-2.5 w-20 bg-secondary/50 rounded animate-pulse" /></td>
      <td className="px-4 py-3"><div className="h-2.5 w-6 bg-secondary/30 rounded animate-pulse" /></td>
      <td className="px-4 py-3"><div className="h-2.5 w-12 bg-secondary/30 rounded animate-pulse" /></td>
    </tr>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <tr>
      <td colSpan={7} className="px-4 py-20 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="text-[56px] font-bold leading-none text-muted-foreground/10 select-none"
            style={{ fontFamily: "var(--font-mono)" }}>
            [ ]
          </div>
          <p className="text-sm font-semibold text-muted-foreground" style={{ fontFamily: "var(--font-display)" }}>
            No applications logged yet
          </p>
          <button onClick={onAdd}
            className="mt-1 text-xs text-primary hover:text-primary/80 underline underline-offset-2 transition-colors">
            Log your first application
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function JobTrackerTable() {
  const qc = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Application | null>(null);

  const { data: apps = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  const createMutation = useMutation({
    mutationFn: async (data: JobApplicationInput) => {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["applications"] }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<JobApplicationInput> }) => {
      const res = await fetch(`/api/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onMutate: async ({ id, data }) => {
      await qc.cancelQueries({ queryKey: ["applications"] });
      const prev = qc.getQueryData<Application[]>(["applications"]);
      qc.setQueryData<Application[]>(["applications"], (old = []) =>
        old.map((a) => (a.id === id ? { ...a, ...data } : a))
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["applications"], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["applications"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/applications/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: ["applications"] });
      const prev = qc.getQueryData<Application[]>(["applications"]);
      qc.setQueryData<Application[]>(["applications"], (old = []) => old.filter((a) => a.id !== id));
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["applications"], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ["applications"] }),
  });

  function openAdd() { setEditing(null); setModalOpen(true); }
  function openEdit(app: Application) { setEditing(app); setModalOpen(true); }

  async function handleSubmit(data: JobApplicationInput) {
    if (editing) {
      await updateMutation.mutateAsync({ id: editing.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  }

  return (
    <>
      <div className="rounded-lg border border-border overflow-hidden">
        {/* Table toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground"
              style={{ fontFamily: "var(--font-display)" }}>
              Applications
            </span>
            {!isLoading && (
              <span className="text-[10px] font-mono text-muted-foreground/60 bg-secondary px-1.5 py-0.5 rounded">
                {apps.length}
              </span>
            )}
          </div>
          <button onClick={openAdd}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest rounded-md",
              "bg-primary/10 text-primary border border-primary/30",
              "hover:bg-primary/20 transition-colors"
            )}
            style={{ fontFamily: "var(--font-display)" }}>
            <Plus className="w-3 h-3" />
            Log application
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                {["#", "Role", "Company", "Status", "Applied", "Link", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
                    style={{ fontFamily: "var(--font-display)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} i={i} />)
                : apps.length === 0
                ? <EmptyState onAdd={openAdd} />
                : apps.map((app, idx) => (
                  <tr key={app.id}
                    className="group border-b border-border/40 hover:bg-secondary/20 transition-colors">
                    <td className="px-4 py-3 text-[11px] text-muted-foreground/40 tabular-nums"
                      style={{ fontFamily: "var(--font-mono)" }}>
                      {String(idx + 1).padStart(2, "0")}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground max-w-[180px] truncate">
                      {app.jobTitle}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[140px] truncate">
                      {app.company}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={app.status}
                        onChange={(e) => updateMutation.mutate({ id: app.id, data: { status: e.target.value as AppStatus } })}
                        className={cn(
                          "text-[11px] font-semibold uppercase tracking-widest rounded px-2 py-0.5 border-0 outline-none cursor-pointer",
                          "bg-transparent focus:ring-1 focus:ring-primary/40 transition-all",
                          STATUS_CONFIG[app.status as AppStatus]?.text ?? "text-muted-foreground",
                          STATUS_CONFIG[app.status as AppStatus]?.bg ?? "bg-secondary/30"
                        )}
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                          <option key={val} value={val} className="bg-card text-foreground">{cfg.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-[11px] text-muted-foreground tabular-nums whitespace-nowrap"
                      style={{ fontFamily: "var(--font-mono)" }}>
                      {new Date(app.appliedAt).toLocaleDateString("en-CA")}
                    </td>
                    <td className="px-4 py-3">
                      {app.url ? (
                        <a href={app.url} target="_blank" rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground/20">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEdit(app)}
                          className="text-muted-foreground hover:text-primary transition-colors">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteMutation.mutate(app.id)}
                          disabled={deleteMutation.isPending}
                          className="text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <ApplicationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        mode={editing ? "edit" : "add"}
        initialValues={editing ? {
          jobTitle: editing.jobTitle,
          company: editing.company,
          url: editing.url ?? "",
          status: editing.status as AppStatus,
          notes: editing.notes ?? "",
        } : undefined}
      />
    </>
  );
}
