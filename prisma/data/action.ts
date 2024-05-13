  import { type Prisma } from "@prisma/client";

  export const actionData: Prisma.ActionUpsertArgs[] = [
    {
      where: { name: "Access Dashboard" },
      create: {
        name: "Access Dashboard",
        route: "/app",
        module: { connect: { name: "Core" } },
      },
      update: {},
    },
    {
      where: { name: "Access Employees Overview" },
      create: {
        name: "Access Employees Overview",
        route: "/app/employees/overview",
        module: { connect: { name: "Core" } },
      },
      update: {},
    },
    {
      where: { name: "Manage Employees" },
      create: {
        name: "Manage Employees",
        route: "/app/employees/manage",
        module: { connect: { name: "Core" } },
      },
      update: {},
    },
    {
      where: { name: "Manage Roles" },
      create: {
        name: "Manage Roles",
        route: "/app/roles/manage",
        module: { connect: { name: "Core" } },
      },
      update: {},
    },
    {
      where: { name: "Record Attendance" },
      create: {
        name: "Record Attendance",
        route: "/app/attendance/record",
        module: { connect: { name: "Attendance Management" } },
      },
      update: {},
    },
    {
      where: { name: "Access Attendance Report" },
      create: {
        name: "Access Attendance Report",
        route: "/app/attendance/report",
        module: { connect: { name: "Attendance Management" } },
      },
      update: {},
    },
    {
      where: { name: "Access Salary Calculations" },
      create: {
        name: "Access Salary Calculations",
        route: "/app/payroll/salary-calculations",
        module: { connect: { name: "Payroll Management" } },
      },
      update: {},
    },
    {
      where: { name: "Access Payroll History" },
      create: {
        name: "Access Payroll History",
        route: "/app/payroll/history",
        module: { connect: { name: "Payroll Management" } },
      },
      update: {},
    },
    {
      where: { name: "Apply for Leave" },
      create: {
        name: "Apply for Leave",
        route: "/app/leave/apply",
        module: { connect: { name: "Leave Management" } },
      },
      update: {},
    },
    {
      where: { name: "Access Leave Management" },
      create: {
        name: "Access Leave Management",
        route: "/app/leave/manage",
        module: { connect: { name: "Leave Management" } },
      },
      update: {},
    },
    {
      where: { name: "Access Leave History" },
      create: {
        name: "Access Leave History",
        route: "/app/leave/history",
        module: { connect: { name: "Leave Management" } },
      },
      update: {},
    },
    {
      where: { name: "Access Internal Notice Board" },
      create: {
        name: "Access Internal Notice Board",
        route: "/app/notice/internal",
        module: { connect: { name: "Notice" } },
      },
      update: {},
    },
    {
      where: { name: "Manage Notice" },
      create: {
        name: "Manage Notice",
        route: "/app/notice/manage",
        module: { connect: { name: "Notice" } },
      },
      update: {},
    },
  ];
