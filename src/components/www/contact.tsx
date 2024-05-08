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
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { SendMessage } from "@/schemas/message";
import { ContactIconsList } from "@/components/www/contact-icon-list";
import classes from "@/styles/components/contact.module.css";
import { notifications } from "@mantine/notifications";

export function Contact({ id }: { id?: string }) {
  const theme = useMantineTheme();
  const gradient = getGradient(theme.defaultGradient, theme);

  const form = useForm<SendMessage>({
    mode: "controlled",
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },

    validate: zodResolver(SendMessage),
  });

  const handleSubmit = (data: SendMessage) => {
    console.log(data);

    notifications.show({
      title: "Thank you for reaching out!",
      message: `${data.name ? data.name + " we" : "We"} got your message. Expect a response very soon.`,
      withBorder: true,
    });

    form.reset();
  };

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
          <form className={classes.form} onSubmit={form.onSubmit(handleSubmit)}>
            <Text fz="lg" fw={700} className={classes.title}>
              Get in touch
            </Text>
            <div className={classes.fields}>
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <TextInput
                  label="Your name"
                  placeholder="Your name"
                  key={form.key("name")}
                  {...form.getInputProps("name")}
                />
                <TextInput
                  label="Your email"
                  type="email"
                  placeholder="user@provider.com"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                  required
                />
              </SimpleGrid>
              <TextInput
                mt="md"
                label="Subject"
                placeholder="Subject"
                key={form.key("subject")}
                {...form.getInputProps("subject")}
                required
              />
              <Textarea
                mt="md"
                label="Your message"
                placeholder="Please include all relevant information"
                key={form.key("message")}
                {...form.getInputProps("message")}
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
