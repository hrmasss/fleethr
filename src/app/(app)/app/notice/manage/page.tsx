import { Button } from "@mantine/core";

export default function Page() {
  return (
    <main>
      <div>
        <h3 className="my-2 text-xl font-bold md:text-3xl">
          Notice Management
        </h3>

        <p>
          Publish & Manage company notices and announcements. You can manage
          both internal and public notice board from here.
        </p>

        <Button className="mt-2">Add notice</Button>
      </div>
    </main>
  );
}
