import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import WavingHand from "@/assets/ui/welcome-hand.png";

export default function SignIn() {
  return (
    <div className="grid min-h-screen p-4 lg:grid-cols-2">
      <div className="hidden items-end justify-center lg:flex">
        <div className="aspect-square max-w-[600px]">
          <Image className="dark:invert" src={WavingHand} alt="" />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Card className="z-10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Let&apos;s get you signed in. Don&apos;t have an account?{" "}
              <a href="" className="text-primary">
                Sign up
              </a>
              .
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Button variant="outline" className="w-full">
                Sign in with Google
              </Button>
              <Button variant="outline" className="w-full">
                Sign in with Twitter
              </Button>
            </div>

            <div className="my-8 flex items-center justify-center gap-2">
              <div className="h-[1px] grow bg-border" />
              or
              <div className="h-[1px] grow bg-border" />
            </div>

            <div className="grid gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="name@company.com" />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="••••••••" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Sign in to your account</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
