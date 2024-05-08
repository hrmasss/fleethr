"use client";

import { Container, Title, Accordion } from "@mantine/core";
import classes from "@/styles/components/faq.module.css";
import { faqs } from "@/lib/data";

export function Faq({ id }: { id?: string }) {
  return (
    <Container size="lg" className={classes.wrapper} id={id}>
      <Title ta="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated">
        {faqs.map((faq, idx) => (
          <Accordion.Item className={classes.item} value={faq.value} key={idx}>
            <Accordion.Control>{faq.question}</Accordion.Control>
            <Accordion.Panel>{faq.answer}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}
