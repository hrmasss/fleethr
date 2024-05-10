"use client";

import { useState } from "react";
import { Stepper } from "@mantine/core";
import { CreateAccountForm } from "@/components/app/create-account-form";
import { CreateOrganizationForm } from "@/components/app/create-organization-form";
import { CreateSubscriptionForm } from "@/components/app/create-subscription-form";

interface Props {
  step?: number;
}

export default function GetStartedFlow({ step }: Props) {
  const [active, setActive] = useState(step ?? 0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  return (
    <Stepper
      mt={{ base: "sm", md: "lg" }}
      active={active}
      classNames={{ steps: "mantine-visible-from-sm" }}
    >
      <Stepper.Step label="Create account">
        <CreateAccountForm onSuccess={nextStep} className="mt-2" />
      </Stepper.Step>
      <Stepper.Step label="Add organization">
        <CreateOrganizationForm onSuccess={nextStep} className="mt-2" />
      </Stepper.Step>
      <Stepper.Step label="Choose features">
        <CreateSubscriptionForm onSuccess={nextStep} className="mt-2" />
      </Stepper.Step>

      <Stepper.Completed>Completed!</Stepper.Completed>
    </Stepper>
  );
}
