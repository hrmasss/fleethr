import {
  IconCoin,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconUsers,
  IconAdjustments,
  IconPuzzle,
  IconSpeakerphone,
} from "@tabler/icons-react";

export const publicLinks = {
  www: "/",
  login: "/login",
  logout: "/logout",
  features: "#features",
  faq: "#faq",
  singup: "/get-started",
  contact: "#contact",
  blog: "#",
  privacy: "#",
  dashboard: "/app",
};

export const socials = {
  facebook: "#",
  twitter: "#",
  instagram: "#",
};

export type TablerIcon = typeof IconGauge;

export type AppLink = {
  label: string;
  icon: TablerIcon;
  href?: string;
  links?: {
    label: string;
    href: string;
  }[];
};

export const appLinks: AppLink[] = [
  { label: "Dashboard", icon: IconGauge, href: publicLinks.dashboard },
  {
    label: "Employees",
    icon: IconUsers,
    links: [
      { label: "Overview", href: "/app/employees/view" },
      { label: "Manage", href: "/app/employees/add" },
      { label: "Assign", href: "#" },
    ],
  },
  {
    label: "Attendance",
    icon: IconCalendarStats,
    links: [
      { label: "Attendance Report", href: "#" },
      { label: "Attendance Submission", href: "#" },
    ],
  },
  { label: "Notice", icon: IconSpeakerphone, href: "/app/notice" },
  { label: "Payroll", icon: IconCoin, href: "/app/payroll" },
  { label: "Projects", icon: IconPuzzle, href: "/app/projects" },
  {
    label: "Analytics",
    icon: IconPresentationAnalytics,
    href: "/app/analytics",
  },
  { label: "Settings", icon: IconAdjustments, href: "/app/settings" },
];
