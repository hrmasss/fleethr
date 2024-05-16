import { Title, Text, Container, Group, Button } from "@mantine/core";
import BackButton from "@/components/back-button";
import LogoutButton from "@/components/logout-button";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Container>
        <Text
          c="gray"
          className="text-center text-7xl font-bold uppercase lg:text-9xl"
        >
          Wait
        </Text>

        <Title className="text-center font-bold mt-2 mb-6">You are about to log out</Title>

        <Group justify="center">
          <BackButton variant="default" size="md">
            Get back
          </BackButton>
          <Button component={LogoutButton} variant="filled" size="md" color="red">
            Log out
          </Button>
        </Group>
      </Container>
    </div>
  );
}
