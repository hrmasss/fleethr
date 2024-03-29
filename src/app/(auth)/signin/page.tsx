import AuthLayout from "@/components/auth/auth-layout";
import SignInForm from "./credentials-signin-form";
import Link from "next/link";

export default function SigninPage() {
  return (
    <AuthLayout
      title="Welcome back"
      description={
        <>
          Let&apos;s get you signed in. Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary">
            Sign up
          </Link>
          .
        </>
      }
      form={<SignInForm />}
    />
  );
}
