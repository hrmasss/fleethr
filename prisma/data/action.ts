import { type Prisma } from "@prisma/client";

export const actionData: Prisma.ActionUpsertArgs[] = [
  {
    where: { name: "Access Dashboard" },
    create: {
      name: "Access Dashboard",
      routes: ["/app"],
      module: { connect: { name: "Core" } },
    },
    update: {},
  },
  {
    where: { name: "Access Employees Overview" },
    create: {
      name: "Access Employees Overview",
      routes: ["/app/employees/overview"],
      module: { connect: { name: "Core" } },
    },
    update: {},
  },
  {
    where: { name: "Manage Employees" },
    create: {
      name: "Manage Employees",
      routes: [
        "/app/employees/manage",
        "/app/employees/manage/new",
        "/app/employees/manage/quick",
        "/app/employees/manage/modify/[id]",
        "/app/employees/manage/view/[id]",
      ],
      module: { connect: { name: "Core" } },
    },
    update: {},
  },
  {
    where: { name: "Manage Departments" },
    create: {
      name: "Manage Departments",
      routes: [
        "/app/departments/manage",
        "/app/departments/manage/new",
        "/app/departments/manage/modify/[id]",
        "/app/departments/manage/view/[id]",
      ],
      module: { connect: { name: "Core" } },
    },
    update: {},
  },
  {
    where: { name: "Manage Roles" },
    create: {
      name: "Manage Roles",
      routes: [
        "/app/roles/manage",
        "/app/roles/manage/new",
        "/app/roles/manage/modify/[id]",
        "/app/roles/manage/view/[id]",
      ],
      module: { connect: { name: "Core" } },
    },
    update: {},
  },
  {
    where: { name: "Record Attendance" },
    create: {
      name: "Record Attendance",
      routes: ["/app/attendance/record"],
      module: { connect: { name: "Attendance Management" } },
    },
    update: {},
  },
  {
    where: { name: "Access Attendance Report" },
    create: {
      name: "Access Attendance Report",
      routes: ["/app/attendance/report", "/app/attendance/report/[id]"],
      module: { connect: { name: "Attendance Management" } },
    },
    update: {},
  },
  {
    where: { name: "Access Salary Calculations" },
    create: {
      name: "Access Salary Calculations",
      routes: ["/app/payroll/salary", "/app/payroll/salary/[id]"],
      module: { connect: { name: "Payroll Management" } },
    },
    update: {},
  },
  {
    where: { name: "Access Payroll History" },
    create: {
      name: "Access Payroll History",
      routes: ["/app/payroll/history", "/app/payroll/history/[id]"],
      module: { connect: { name: "Payroll Management" } },
    },
    update: {},
  },
  {
    where: { name: "Apply for Leave" },
    create: {
      name: "Apply For Leave",
      routes: ["/app/leave/apply"],
      module: { connect: { name: "Leave Management" } },
    },
    update: {},
  },
  {
    where: { name: "Access Leave Management" },
    create: {
      name: "Access Leave Management",
      routes: ["/app/leave/manage"],
      module: { connect: { name: "Leave Management" } },
    },
    update: {},
  },
  {
    where: { name: "Access Leave History" },
    create: {
      name: "Access Leave History",
      routes: ["/app/leave/history", "/app/leave/history/[id]"],
      module: { connect: { name: "Leave Management" } },
    },
    update: {},
  },
  {
    where: { name: "Access Internal Notice Board" },
    create: {
      name: "Access Internal Notice Board",
      routes: ["/app/notice/internal", "/app/notice/internal/[id]"],
      module: { connect: { name: "Notice" } },
    },
    update: {},
  },
  {
    where: { name: "Manage Notice" },
    create: {
      name: "Manage Notice",
      routes: [
        "/app/notice/manage",
        "/app/notice/manage/new",
        "/app/notice/manage/modify/[id]",
      ],
      module: { connect: { name: "Notice" } },
    },
    update: {},
  },
  {
    where: { name: "Manage Settings" },
    create: {
      name: "Manage Settings",
      routes: ["/app/settings"],
      module: { connect: { name: "Core" } },
    },
    update: {},
  },
];
