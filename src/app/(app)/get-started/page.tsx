import GetStartedFlow from "@/components/app/get-started-flow";
import classes from "@/styles/components/login-form.module.css";
import { Paper, Title, Text } from "@mantine/core";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function Page() {
  const session = await getServerAuthSession();
  const organization = session ? await api.user.getOrganization() : null;

  const step = organization?.subscription
    ? 3
    : organization
      ? 2
      : session
        ? 1
        : 0;

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

          <GetStartedFlow step={step} />
        </main>
      </Paper>
    </section>
  );
}
