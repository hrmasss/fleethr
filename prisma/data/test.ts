import type { PrismaClient } from "@prisma/client";
import { moduleData } from "prisma/data/module";
import { defaultRoles } from "prisma/data/role";
import bcrypt from "bcryptjs";

const testData = {
  organizations: [
    {
      name: "TechCorp",
      slug: "techcorp",
      description: "A leading technology company",
      maxSize: 100,
    },
    {
      name: "FinanceHub",
      slug: "financehub",
      description: "Innovative financial services provider",
      maxSize: 75,
    },
    {
      name: "GreenEnergy",
      slug: "greenenergy",
      description: "Sustainable energy solutions",
      maxSize: 50,
    },
  ],

  users: [
    {
      name: "John Doe",
      email: "john@techcorp.com",
      password: bcrypt.hashSync("john@techcorp.com", 8),
    },
    {
      name: "Jane Smith",
      email: "jane@financehub.com",
      password: bcrypt.hashSync("jane@financehub.com", 8),
    },
    {
      name: "Mike Johnson",
      email: "mike@greenenergy.com",
      password: bcrypt.hashSync("mike@greenenergy.com", 8),
    },
  ],

  departments: [
    { name: "Engineering" },
    { name: "Marketing" },
    { name: "Sales" },
    { name: "Human Resources" },
    { name: "Finance" },
  ],
};

export async function seedTestData(prisma: PrismaClient) {
  for (let i = 0; i < testData.organizations.length; i++) {
    const org = testData.organizations[i];
    const owner = testData.users[i];

    if (!org || !owner) continue;

    const createdOwner = await prisma.user.create({
      data: {
        name: owner.name,
        email: owner.email,
        password: owner.password,
      },
    });

    const createdOrg = await prisma.organization.create({
      data: {
        name: org.name,
        slug: org.slug,
        description: org.description,
        maxSize: org.maxSize,
        owner: { connect: { id: createdOwner.id } },
      },
    });

    // Update owner with organization
    await prisma.user.update({
      where: { id: createdOwner.id },
      data: { organization: { connect: { id: createdOrg.id } } },
    });

    // Create subscription for the organization
    const moduleNames = moduleData.map((module) => module.where.name);
    await prisma.subscription.create({
      data: {
        organization: { connect: { id: createdOrg.id } },
        startingDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // 1 year from now
        isAutoRenewEnabled: true,
        durationInMonths: 12,
        modules: {
          connect: moduleNames.map((name) => ({ name })),
        },
      },
    });

    // Create departments
    for (const dept of testData.departments) {
      await prisma.department.create({
        data: {
          name: dept.name,
          organization: { connect: { id: createdOrg.id } },
        },
      });
    }

    // Create roles with permissions
    await Promise.all(
      defaultRoles.map(async ({ data: role }) => {
        await prisma.role.create({
          data: {
            name: role.name,
            description: role.description,
            permissions: role.permissions,
            organizationId: createdOrg.id,
          },
        });
      }),
    );

    // Create employees
    const departments = await prisma.department.findMany({
      where: { organizationId: createdOrg.id },
    });
    const roles = await prisma.role.findMany({
      where: { organizationId: createdOrg.id },
    });

    if (departments.length === 0 || roles.length === 0) {
      console.error(
        `No departments or roles found for organization ${createdOrg.id}`,
      );
      continue;
    }

    for (let j = 0; j < 10; j++) {
      const email = `employee${j + 1}@${org.slug}.com`;
      const departmentId = departments[j % departments.length]?.id;
      const roleId = roles[j % roles.length]?.id;

      if (!departmentId || !roleId) {
        console.error(
          `Missing department or role for employee ${j + 1} in organization ${createdOrg.id}`,
        );
        continue;
      }

      const employee = await prisma.employee.create({
        data: {
          employeeId: `EMP-${org.slug.toUpperCase()}-${j + 1}`,
          name: `Employee ${j + 1}`,
          email,
          jobTitle: `Job Title ${j + 1}`,
          department: { connect: { id: departmentId } },
          organization: { connect: { id: createdOrg.id } },
        },
      });

      await prisma.user.create({
        data: {
          name: employee.name,
          email: employee.email,
          password: bcrypt.hashSync(email, 8),
          role: { connect: { id: roleId } },
          organization: { connect: { id: createdOrg.id } },
          employeeRecord: { connect: { id: employee.id } },
        },
      });
    }
  }
}
