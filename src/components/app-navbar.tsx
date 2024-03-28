import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getServerAuthSession } from "@/server/auth";
import { cn } from "@/lib/utils";
import AppSidebar from "./app-sidebar";

interface Props {
  className?: string;
}

export default async function AppNavbar({ className }: Props) {
  const session = await getServerAuthSession();

  if (!session?.user) return null;

  return (
    <header
      className={cn(
        "sticky top-0 flex items-center justify-between border-b bg-background px-4 py-2 lg:px-24",
        className,
      )}
    >
      <Link href="/" className="text-2xl font-black text-primary">
        fleethr
      </Link>

      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <HamburgerMenuIcon className="h-5 w-5 hover:text-primary" />
        </SheetTrigger>
        <SheetContent side="left" className="w-fit bg-card p-0 pt-10">
          <AppSidebar user={session?.user} className="border-none"/>
        </SheetContent>
      </Sheet>
    </header>
  );
}
