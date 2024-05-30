import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { EmailTemplate } from "@/components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export const sendOnboardingEmail = async (
  email: string,
  name: string | null,
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "FleetHR <fleethr@updates.hojayfa.codes>",
      to: [email],
      subject: "Welcome to FleetHR",
      react: EmailTemplate({
        name: name ?? undefined,
        actionUrl: "https://fleethr.vercel.app",
        bodyText:
          "Your employee account on fleethr is now active. Click the button below to complete onboarding.",
        actionText: "Go to fleethr",
      }),
    });

    if (error) {
      console.error(error);
    } else console.log(`Email successfully sent to ${email}.`, data);
  } catch (error) {
    console.error(error);
  }
};
