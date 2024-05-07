import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const user = (await getServerAuthSession())?.user;

  return (
    <div className="flex flex-col items-center justify-center text-5xl font-bold text-center">
      <span className="block my-2 text-lg">{user && `Hello, ${user.name}`}</span>
      Let&apos;s go
    </div>
  );
}
