"use client";

import { Title, Text, Button, Container, Group } from "@mantine/core";
import BackButton from "@/components/back-button";
import classes from "@/styles/components/error.module.css";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Something bad just happened</Title>
        <Text size="lg" ta="center" className={classes.description}>
          We could not handle your request. Try reloading the page.
        </Text>
        <Group justify="center">
          <Button variant="default" size="md" onClick={() => reset()}>
            Reload
          </Button>
          <BackButton variant="filled" size="md">
            Get back
          </BackButton>
        </Group>
      </Container>
    </div>
  );
}
