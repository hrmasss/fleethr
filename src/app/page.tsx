import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const user = (await getServerAuthSession())?.user;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-5xl font-bold">
      <span className="block my-2">{user && `Hello, ${user.name}`}</span>
      Let&apos;s go
    </div>
  );
}
