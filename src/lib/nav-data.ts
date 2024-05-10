import {
  IconCoin,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconUsers,
  IconAdjustments,
  IconPuzzle,
} from "@tabler/icons-react";

export const publicLinks = {
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

export const appLinks = [
  { label: "Dashboard", icon: IconGauge, href: publicLinks.dashboard },
  {
    label: "Employees",
    icon: IconUsers,
    initiallyOpened: false,
    links: [
      { label: "Overview", href: "#" },
      { label: "Manage", href: "#" },
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
  { label: "Projects", icon: IconPuzzle, href: "#" },
  { label: "Payroll", icon: IconCoin, href: "#" },
  { label: "Analytics", icon: IconPresentationAnalytics, href: "#" },
  { label: "Settings", icon: IconAdjustments, href: "#" },
];
