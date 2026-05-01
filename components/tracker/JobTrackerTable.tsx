"use client";
// TODO: Phase 6 — sortable/filterable table with add/edit modal, status dropdown, optimistic updates
export default function JobTrackerTable() {
  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Applications</h2>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-sm" disabled>
          + Add Application
        </button>
      </div>
      <div className="text-sm text-muted-foreground">No applications tracked yet.</div>
    </div>
  );
}
