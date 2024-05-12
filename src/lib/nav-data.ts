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
