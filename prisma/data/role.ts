import { type Prisma } from "@prisma/client";

export const defaultRoles: Prisma.RoleCreateArgs[] = [
  {
    data: {
      name: "Admin",
      description:
        "This role provides full access to all features and functionalities within the system. Administrators with this role can manage employees, roles, attendance, payroll, leave, notices, and have access to all reports and settings.",
      permissions: {
        connect: [
          { name: "Access Dashboard" },
          { name: "Access Employees Overview" },
          { name: "Manage Employees" },
          { name: "Manage Roles" },
          { name: "Record Attendance" },
          { name: "Access Attendance Report" },
          { name: "Access Salary Calculations" },
          { name: "Access Payroll History" },
          { name: "Apply For Leave" },
          { name: "Access Leave Management" },
          { name: "Access Leave History" },
          { name: "Access Internal Notice Board" },
          { name: "Manage Notice" },
          { name: "Manage Settings" },
        ],
      },
      organizationId: "",
    },
  },
  {
    data: {
      name: "Manager",
      description:
        "This role provides access to manage team members, approve leave requests, and view reports. Managers can access most features but have limited ability to modify system settings.",
      permissions: {
        connect: [
          { name: "Access Dashboard" },
          { name: "Access Employees Overview" },
          { name: "Manage Employees" },
          { name: "Record Attendance" },
          { name: "Access Attendance Report" },
          { name: "Access Salary Calculations" },
          { name: "Apply For Leave" },
          { name: "Access Leave Management" },
          { name: "Access Leave History" },
          { name: "Access Internal Notice Board" },
          { name: "Manage Notice" },
        ],
      },
      organizationId: "",
    },
  },
  {
    data: {
      name: "Employee",
      description:
        "This role provides basic access to essential features for employees. Employees with this role can access the dashboard, record attendance, apply for leave, view leave history, and access internal notices.",
      permissions: {
        connect: [
          { name: "Access Dashboard" },
          { name: "Record Attendance" },
          { name: "Access Attendance Report" },
          { name: "Apply For Leave" },
          { name: "Access Leave History" },
          { name: "Access Internal Notice Board" },
        ],
      },
      organizationId: "",
    },
  },
];
