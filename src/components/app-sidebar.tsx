import type { User } from "next-auth";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LineChart,
  Users,
  Ghost,
  CalendarFold,
  LogOut,
  Cog,
} from "lucide-react";
import Link from "next/link";
import { ThemeSwitch } from "./theme-switch";

interface Props {
  user: User;
  className?: string;
}

const navLinks = [
  {
    text: "Dashboard",
    href: "/app",
    icon: LineChart,
  },
  {
    text: "Employee Management",
    href: "#",
    icon: Users,
  },
  {
    text: "Attendance Management",
    href: "#",
    icon: CalendarFold,
  },
  {
    text: "Leave Management",
    href: "#",
    icon: Ghost,
  },
];

export default function AppSidebar({ user, className }: Props) {
  return (
    <div
      className={cn(
        "flex size-full flex-col border-r bg-card text-sm font-medium shadow-sm",
        className,
      )}
    >
      {/* User profile */}
      <div className="border-b p-4">
        <div className="cursor-pointer rounded-lg border p-2">
          <span className="flex items-center gap-2">
            {user.image && (
              <Avatar className="size-6">
                <AvatarImage src={user.image} alt="User avatar" />
                <AvatarFallback className="text-xs">
                  {user.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}
            <span>{user.name}</span>
          </span>
        </div>
      </div>

      <nav className="grow space-y-4 p-4">
        {navLinks.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="block rounded-lg p-2 hover:bg-muted"
          >
            <span className="flex items-center gap-2">
              <link.icon className="size-4" />
              {link.text}
            </span>
          </Link>
        ))}
      </nav>

      <div className="space-y-4 border-t p-4">
        <div className="rounded-lg p-2 hover:bg-muted">
          <span className="flex gap-2 items-center">
              <ThemeSwitch variant="combo" />
          </span>
        </div>

        <Link href="#" className="block rounded-lg p-2 hover:bg-muted">
          <span className="flex items-center gap-2">
            <Cog className="size-4" />
            Settings
          </span>
        </Link>
      </div>

      <div className="border-t p-4">
        <Link
          href="/signout"
          className="block rounded-lg p-2 hover:bg-destructive/20 "
        >
          <span className="flex items-center gap-2">
            <LogOut className="size-4" />
            Sign out
          </span>
        </Link>
      </div>
    </div>
  );
}
