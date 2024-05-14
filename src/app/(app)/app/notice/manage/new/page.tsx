import { NoticeForm } from "@/components/app/notice-form";
import { Card } from "@mantine/core";

export default function Page() {
  return (
    <main>
      <h3 className="mt-2 mb-4 text-xl font-bold md:text-3xl">
        Publish a new notice
      </h3>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <NoticeForm />
      </Card>
    </main>
  );
}
