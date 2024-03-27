import { getServerAuthSession } from "@/server/auth";

export async function checkUserRole() {
  const session = await getServerAuthSession();
  return session?.user.role;
}
