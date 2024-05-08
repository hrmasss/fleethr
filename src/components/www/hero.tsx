"use client";

import {
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import HeroImage from "@/components/images/hero-image";
import classes from "@/styles/components/hero.module.css";
import { publicLinks as navlinks } from "@/lib/nav-data";
import Link from "next/link";

export function Hero() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            A <span className={classes.highlight}>flexible</span> human <br />{" "}
            resource platform
          </Title>
          <Text c="dimmed" mt="md">
            Flexible, open-source HR management platform with modular pricing,
            intuitive interface, and analytics.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Open Source</b> – FleetHR is built on open-source technologies,
              ensuring transparency.
            </List.Item>
            <List.Item>
              <b>Modular Pricing</b> – Choose and pay only for the modules you
              need, eliminating unnecessary costs.
            </List.Item>
            <List.Item>
              <b>Intuitive User Interface</b> – Experience a clean and
              user-friendly interface.
            </List.Item>
          </List>

          <Group mt={30}>
            <Button
              variant="gradient"
              radius="xl"
              size="md"
              className={classes.control}
              component={Link}
              href={navlinks.singup}
            >
              Get started
            </Button>
            <Button
              variant="default"
              radius="xl"
              size="md"
              component={Link}
              href={navlinks.faq}
              className={classes.control}
            >
              See Pricing
            </Button>
          </Group>
        </div>
        <HeroImage className={classes.image} />
      </div>
    </Container>
  );
}
