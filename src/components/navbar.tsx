import Link from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getServerAuthSession } from "@/server/auth";

const navLinks = [
  {
    text: "Features",
    href: "#features",
  },
  {
    text: "Pricing",
    href: "#pricing",
  },
  {
    text: "Docs",
    href: "#docs",
  },
];

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <header className="sticky top-0 flex items-center justify-between border-b bg-background px-4 py-2 lg:px-24">
      <Link href="/" className="text-2xl font-black text-primary">
        fleethr
      </Link>

      <ul className="hidden font-medium md:flex md:items-center md:justify-center md:space-x-6">
        {navLinks.map((link, idx) => (
          <li key={idx}>
            <Link href={link.href} className="hover:text-primary">
              {link.text}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center space-x-6">
        <span className="hidden md:block">
          <ThemeSwitch />
        </span>

        <Button asChild className="hidden text-xs md:block md:text-sm">
          <Link href={session ? "/dashboard" : "/api/auth/signin"}>
            {session ? "Dashboard" : "Sign in"}
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <HamburgerMenuIcon className="h-5 w-5 hover:text-primary" />
          </SheetTrigger>
          <SheetContent className="w-full">
            <ul className="flex h-full flex-col items-center justify-center space-y-6">
              <Link
                className="text-xl"
                href={session ? "/app/dashboard" : "/api/auth/signin"}
              >
                {session ? "Dashboard" : "Sign in"}
              </Link>
              <ThemeSwitch variant="text" className="text-xl" />
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-xl hover:text-primary">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
