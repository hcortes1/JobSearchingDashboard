"use client";

import { cn } from "@/lib/utils";
import {
  ClipboardList,
  LayoutDashboard,
  User,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tracker",   label: "Tracker",   icon: ClipboardList },
  { href: "/profile",   label: "Profile",   icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 flex flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span
            className="text-sm font-bold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            PostUniJobFinder
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p
          className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Navigation
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150",
                active
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-colors",
                  active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}
                strokeWidth={active ? 2.5 : 2}
              />
              <span style={active ? { fontFamily: "var(--font-display)" } : {}}>
                {label}
              </span>
              {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer hint */}
      <div className="px-5 py-4 border-t border-border">
        <p className="text-[10px] text-muted-foreground leading-relaxed">
          Track smarter.<br />
          <span className="text-primary font-medium">Land faster.</span>
        </p>
      </div>
    </aside>
  );
}
