"use client";

import { useState } from "react";
import classes from "@/styles/components/login-form.module.css";
import { CreateAccountForm } from "@/components/app/create-account-form";
import Logo from "@/components/images/logo";
import Link from "next/link";
import {
  Stepper,
  Paper,
  Button,
  Group,
  Code,
  Title,
  Text,
} from "@mantine/core";

export default function Page() {
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <section className={classes.wrapper}>
      <Paper
        maw={{ base: "100%", md: 950 }}
        mih="100vh"
        className="ml-auto p-4 md:p-12 xl:px-32"
      >
        <main>
          <Link
            href="/"
            className="mb-4 flex items-center justify-center gap-2 md:justify-start"
          >
            <Logo className="size-10" />
            <Text className="hidden text-3xl font-bold md:block">fleethr</Text>
          </Link>
          <Title className={classes.title} ta={{ base: "center", sm: "left" }}>
            Welcome to FleetHR
          </Title>
          <Text c="gray" ta={{ base: "center", sm: "left" }}>
            Let&apos;s get you started.
          </Text>

          <Stepper
            mt="xl"
            active={active}
            classNames={{ steps: "mantine-visible-from-sm" }}
          >
            <Stepper.Step label="First step" description="Profile settings">
              <CreateAccountForm onSubmit={(data) => console.log(data)} />
            </Stepper.Step>
            <Stepper.Step label="Second step" description="Profile settings">
              <CreateAccountForm onSubmit={(data) => console.log(data)} />
            </Stepper.Step>
            <Stepper.Step label="Third step" description="Profile settings">
              <CreateAccountForm onSubmit={(data) => console.log(data)} />
            </Stepper.Step>

            <Stepper.Completed>
              Completed! Form values:
              <Code block mt="xl">
                Well done!
              </Code>
            </Stepper.Completed>
          </Stepper>
          <Group justify="flex-end" mt="xl">
            {active !== 0 && (
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
            )}
            {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
          </Group>
        </main>
      </Paper>
    </section>
  );
}
