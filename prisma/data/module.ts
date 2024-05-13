import type { Prisma } from "@prisma/client";

export const moduleData: Prisma.ModuleUpsertArgs[] = [
  {
    where: { name: "Core" },
    create: {
      name: "Core",
      description: "Manage employee data, roles, permissions, and settings.",
      features: [
        "Employee Management",
        "Role Management",
        "Permission Management",
        "Dashboard",
        "Settings",
      ],
      price: 0,
    },
    update: {},
  },
  {
    where: { name: "Attendance Management" },
    create: {
      name: "Attendance Management",
      description: "Track employee time and attendance.",
      features: ["Time Tracking", "Attendance Reports"],
      price: 0.1,
      dependsOn: {
        connect: { name: "Core" },
      },
    },
    update: {},
  },
  {
    where: { name: "Payroll Management" },
    create: {
      name: "Payroll Management",
      description: "Handle salary calculations and payslip generation.",
      features: ["Salary Calculations", "Payslip Generation"],
      price: 0.15,
      dependsOn: {
        connect: [{ name: "Core" }, { name: "Attendance Management" }],
      },
    },
    update: {},
  },
  {
    where: { name: "Leave Management" },
    create: {
      name: "Leave Management",
      description: "Manage employee leave requests and tracking.",
      features: ["Leave Requests", "Leave Authorization", "Leave Tracking"],
      price: 0.12,
      dependsOn: {
        connect: [{ name: "Core" }, { name: "Attendance Management" }],
      },
    },
    update: {},
  },
  {
    where: { name: "Notice" },
    create: {
      name: "Notice",
      description: "Publish company notices and announcements.",
      features: ["Notice Board", "Public Notices", "Private Notices"],
      price: 0.08,
      dependsOn: {
        connect: { name: "Core" },
      },
    },
    update: {},
  },
];
