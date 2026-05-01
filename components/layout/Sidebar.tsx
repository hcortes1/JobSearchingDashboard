// TODO: Phase 4 — active link highlighting, collapse on mobile
const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/jobs", label: "Job Search" },
  { href: "/tracker", label: "Tracker" },
  { href: "/outreach", label: "Outreach" },
  { href: "/profile", label: "Profile" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-lg font-bold">JobDash</h2>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
