"use client";

import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  SimpleGrid,
  Box,
  Container,
  useMantineTheme,
  getGradient,
  Title,
} from "@mantine/core";
import { ContactIconsList } from "@/components/www/contact-icon-list";
import classes from "@/styles/components/contact.module.css";

export function Contact({ id }: { id?: string }) {
  const theme = useMantineTheme();
  const gradient = getGradient(theme.defaultGradient, theme);

  return (
    <Container size="lg" id={id} py="xl">
      <Title ta="center" className={classes.title}>
        Have other questions or suggestions?
      </Title>

      <Paper shadow="md" radius="lg">
        <div className={classes.wrapper}>
          <Box className={classes.contacts} bg={gradient}>
            <Text fz="lg" fw={700} className={classes.title} c="dark.9">
              Contact information
            </Text>
            <ContactIconsList />
          </Box>
          <form
            className={classes.form}
            onSubmit={(event) => event.preventDefault()}
          >
            <Text fz="lg" fw={700} className={classes.title}>
              Get in touch
            </Text>
            <div className={classes.fields}>
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput label="Your name" placeholder="Your name" />
                <TextInput
                  label="Your email"
                  placeholder="user@provider.com"
                  required
                />
              </SimpleGrid>
              <TextInput
                mt="md"
                label="Subject"
                placeholder="Subject"
                required
              />
              <Textarea
                mt="md"
                label="Your message"
                placeholder="Please include all relevant information"
                minRows={3}
              />
              <Group justify="flex-end" mt="md">
                <Button type="submit" className={classes.control}>
                  Send message
                </Button>
              </Group>
            </div>
          </form>
        </div>
      </Paper>
    </Container>
  );
}
