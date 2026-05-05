"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/dashboard":  "Dashboard",
  "/tracker":    "Tracker",
  "/profile":    "Profile",
  "/onboarding": "Onboarding",
};

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Dashboard";
  const initials = session?.user?.name
    ? session.user.name.slice(0, 2).toUpperCase()
    : "??";

  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-border bg-card">
      <h1
        className="text-lg font-semibold tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h1>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2.5 px-3 py-1.5 rounded-md border border-border hover:border-primary/40 hover:bg-secondary transition-all group outline-none">
          <div className="w-7 h-7 rounded-md bg-primary/15 border border-primary/30 flex items-center justify-center">
            <span
              className="text-xs font-bold text-primary"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {initials}
            </span>
          </div>
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors max-w-[120px] truncate">
            {session?.user?.name ?? "Account"}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-card border-border">
          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
            {session?.user?.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem className="gap-2 cursor-pointer hover:text-foreground">
            <User className="w-4 h-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2 cursor-pointer hover:text-foreground">
            <Settings className="w-4 h-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem
            className="gap-2 cursor-pointer text-destructive hover:text-destructive focus:text-destructive"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
