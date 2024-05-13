import {
  IconCoin,
  IconCalendarStats,
  IconGauge,
  IconUsers,
  IconAdjustments,
  IconSpeakerphone,
  IconBeach,
  IconShield,
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
  { label: "Dashboard", icon: IconGauge, href: "/app" },
  {
    label: "Employees",
    icon: IconUsers,
    links: [
      { label: "Overview", href: "/app/employees/overview" },
      { label: "Manage", href: "/app/employees/manage" },
    ],
  },
  {
    label: "Attendance",
    icon: IconCalendarStats,
    links: [
      { label: "Attendance Submission", href: "/app/attendance/record" },
      { label: "Attendance Report", href: "/app/attendance/report" },
    ],
  },
  {
    label: "Payroll",
    icon: IconCoin,
    links: [
      {
        label: "Salary Calculations",
        href: "/app/payroll/salary",
      },
      { label: "Payment History", href: "/app/payroll/history" },
    ],
  },
  {
    label: "Leave Management",
    icon: IconBeach,
    links: [
      { label: "Apply for Leave", href: "/app/leave/apply" },
      { label: "Leave Management", href: "/app/leave/manage" },
      { label: "Leave History", href: "/app/leave/history" },
    ],
  },
  {
    label: "Notice",
    icon: IconSpeakerphone,
    links: [
      { label: "Internal Notice Board", href: "/app/notice/internal" },
      { label: "Manage Notice", href: "/app/notice/manage" },
    ],
  },
  { label: "Role Management", icon: IconShield, href: "/app/role/manage" },
  { label: "Settings", icon: IconAdjustments, href: "/app/settings" },
];