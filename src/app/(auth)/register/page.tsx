import AuthLayout from "@/components/auth/auth-layout";
import CredentialsSignUpForm from "./credentials-signup-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create an account"
      description={
        <>
          Let&apos;s get you set up. Already have an account?{" "}
          <Link href="/signin" className="text-primary">
            Sign in
          </Link>
          .
        </>
      }
      form={<CredentialsSignUpForm />}
    />
  );
}
