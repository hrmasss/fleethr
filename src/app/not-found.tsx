import { Container, Title, Text, Group } from "@mantine/core";
import classes from "@/styles/components/not-found.module.css";
import NotFoundImage from "@/components/images/not-found-image";
import BackButton from "@/components/back-button";

export default function NotFound() {
  return (
    <div className={classes.root}>
      <Container>
        <NotFoundImage className={classes.image} />
        <Title className={classes.title}>Something&apos;s missing</Title>
        <Text size="lg" ta="center" className={classes.description}>
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </Text>
        <Group justify="center">
          <BackButton variant="filled" size="md">
            Get back
          </BackButton>
        </Group>
      </Container>
    </div>
  );
}
