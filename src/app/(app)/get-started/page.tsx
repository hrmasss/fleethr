"use client";

import { useState } from "react";
import classes from "@/styles/components/login-form.module.css";
import { CreateAccountForm } from "@/components/app/create-account-form";
import { Stepper, Paper, Title, Text } from "@mantine/core";

export default function Page() {
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  return (
    <section className={classes.wrapper}>
      <Paper
        maw={{ base: "100%", md: 950 }}
        mih="100vh"
        className="ml-auto px-4 py-12 md:px-12 xl:px-32"
      >
        <main>
          <Title
            className="text-2xl md:text-4xl"
            ta={{ base: "center", sm: "left" }}
          >
            Welcome to FleetHR
          </Title>
          <Text c="gray" ta={{ base: "center", sm: "left" }}>
            Let&apos;s get you started.
          </Text>

          <Stepper
            mt={{ base: "sm", md: "lg" }}
            active={active}
            classNames={{ steps: "mantine-visible-from-sm" }}
          >
            <Stepper.Step label="Create account">
              <CreateAccountForm onSuccess={nextStep} className="mt-2" />
            </Stepper.Step>
            <Stepper.Step label="Add organization">Step 2</Stepper.Step>
            <Stepper.Step label="Choose features">Step 3</Stepper.Step>

            <Stepper.Completed>Completed!</Stepper.Completed>
          </Stepper>
        </main>
      </Paper>
    </section>
  );
}
