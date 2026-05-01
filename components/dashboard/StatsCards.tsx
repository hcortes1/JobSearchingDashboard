// TODO: Phase 4 — fetch real counts from /api/applications, use TanStack Query
const placeholderStats = [
  { label: "Applied", value: 0, color: "bg-blue-50 text-blue-700" },
  { label: "Interview", value: 0, color: "bg-yellow-50 text-yellow-700" },
  { label: "Accepted", value: 0, color: "bg-green-50 text-green-700" },
  { label: "Rejected", value: 0, color: "bg-red-50 text-red-700" },
  { label: "No Response", value: 0, color: "bg-gray-50 text-gray-700" },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {placeholderStats.map((stat) => (
        <div key={stat.label} className={`rounded-lg p-4 ${stat.color}`}>
          <p className="text-sm font-medium">{stat.label}</p>
          <p className="text-3xl font-bold mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
