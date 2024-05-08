"use client";

import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from "@mantine/core";
import classes from "@/styles/components/features.module.css";
import { features } from "@/lib/data";

export function Features({ id }: { id?: string }) {
  const theme = useMantineTheme();
  const featureSet = features.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.primaryColor}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl" id={id}>
      <Group justify="center">
        <Badge variant="filled" size="lg">
          Streamlined HR Management
        </Badge>
      </Group>
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Seamless Integration with your workflow
      </Title>
      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        FleetHR is designed to integrate smoothly with your existing
        infrastructure, ensuring a seamless and efficient HR experience across
        your organization.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {featureSet}
      </SimpleGrid>
    </Container>
  );
}
