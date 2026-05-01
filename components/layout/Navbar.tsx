// TODO: Phase 4 — mobile-first top navbar (alternative to sidebar on small screens)
export default function Navbar() {
  return (
    <nav className="bg-white border-b px-4 py-3 flex items-center justify-between md:hidden">
      <span className="font-bold">JobDash</span>
      <button className="p-2">☰</button>
    </nav>
  );
}
