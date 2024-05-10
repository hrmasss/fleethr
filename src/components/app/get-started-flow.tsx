"use client";

import { useState, useEffect } from "react";
import { Stepper, Box, Text, Button } from "@mantine/core";
import { IconRosetteDiscountCheck } from "@tabler/icons-react";
import { CreateAccountForm } from "@/components/app/create-account-form";
import { CreateOrganizationForm } from "@/components/app/create-organization-form";
import { CreateSubscriptionForm } from "@/components/app/create-subscription-form";
import { publicLinks } from "@/lib/nav-data";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  step?: number;
}

export default function GetStartedFlow({ step }: Props) {
  const [active, setActive] = useState(step ?? 0);
  const router = useRouter();

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  useEffect(() => {
    if (active === 3) router.push(publicLinks.dashboard);
  }, [active, router]);

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

      <Stepper.Completed>
        <div className="mt-4 flex flex-col items-center gap-4 text-center md:mt-12">
          <Box c="teal">
            <IconRosetteDiscountCheck className="size-32" />
          </Box>

          <h3 className="text-2xl font-bold md:text-4xl">
            Onboarding complete
          </h3>

          <Text c="dimmed" className="text-sm sm:text-base">
            Heading to the dashboard. If not automatically redirected within a
            few seconds, please use the button below.
          </Text>

          <Button
            mt="sm"
            variant="gradient"
            component={Link}
            href={publicLinks.dashboard}
          >
            Go to dashboard
          </Button>
        </div>
      </Stepper.Completed>
    </Stepper>
  );
}
