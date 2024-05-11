import { PrismaClient, type Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const moduleData: Prisma.ModuleUpsertArgs[] = [
    {
      where: { name: "Core" },
      update: {},
      create: {
        name: "Core",
        description: "Manage employee & organization data.",
        features: ["Organization Info", "Employee Records"],
        price: 0,
      },
    },
    {
      where: { name: "Attendance" },
      update: {},
      create: {
        name: "Attendance",
        description: "Track employee attendance and manage time-offs.",
        features: [
          "Time Tracking",
          "Shift Management",
          "Overtime Calculations",
        ],
        price: 0.5,
        dependsOn: {
          connect: { name: "Core" },
        },
      },
    },
    {
      where: { name: "Payroll" },
      update: {},
      create: {
        name: "Payroll",
        description: "Handle payroll calculations and disbursements.",
        features: [
          "Salary Calculations",
          "Tax Management",
          "Payslip Generation",
        ],
        price: 0.65,
        dependsOn: {
          connect: [{ name: "Core" }, { name: "Attendance" }],
        },
      },
    },
    {
      where: { name: "Leave Management" },
      update: {},
      create: {
        name: "Leave Management",
        description: "Manage employee leave requests and policies.",
        features: ["Leave Requests", "Leave Policies", "Leave Tracking"],
        price: 0.45,
        dependsOn: {
          connect: { name: "Core" },
        },
      },
    },
    {
      where: { name: "Notice" },
      update: {},
      create: {
        name: "Notice",
        description: "Publish company notices and announcements.",
        features: ["Notice Board", "Email Notifications", "Push Notifications"],
        price: 0.3,
      },
    },
  ];

  for (const data of moduleData) {
    await prisma.module.upsert(data);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
