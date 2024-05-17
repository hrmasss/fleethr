import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const checkUniqueEmployeeId = async (
  db: Prisma.TransactionClient,
  organizationId: string,
  employeeId: string,
  excludeId?: string,
) => {
  const existingEmployee = await db.employee.findFirst({
    where: {
      organizationId,
      employeeId,
      id: { not: excludeId },
    },
  });

  if (existingEmployee) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "An employee with the same employee ID already exists",
    });
  }
};

export const checkUniqueEmployeeEmail = async (
  db: Prisma.TransactionClient,
  organizationId: string,
  email: string,
  excludeId?: string,
) => {
  const existingEmployee = await db.employee.findFirst({
    where: {
      organizationId,
      email,
      id: { not: excludeId },
    },
  });

  if (existingEmployee) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "An employee with the email already exists",
    });
  }
};
