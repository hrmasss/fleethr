"use client";

import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import OrganizationForm from "./organization-form";
import SubscriptionForm from "./subscription-form";
import PeopleForm from "./people-form";
import FormSkeleton from "./form-skeleton";
import Image from "next/image";
import OnboardImage from "@/assets/ui/onboard-rocket.png";

export default function GetStarted() {
  const [step, setStep] = useState(0);
  const { data: organization, isLoading: orgLoading } =
    api.organization.get.useQuery();
  const { data: subscription, isLoading: subLoading } =
    api.subscription.get.useQuery();

  useEffect(() => {
    if (organization && subscription) {
      setStep(3);
    } else if (organization && !subscription) {
      setStep(2);
    } else if (!(orgLoading || subLoading)) setStep(1);
  }, [organization, subscription, orgLoading, subLoading]);

  const handleSuccess = () => setStep((prev) => prev + 1);

  const renderForm = () => {
    switch (step) {
      case 0:
        return <FormSkeleton />;
      case 1:
        return <OrganizationForm onSuccess={handleSuccess} />;
      case 2:
        return <SubscriptionForm onSuccess={handleSuccess} />;
      case 3:
        return <PeopleForm />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="group hidden items-center bg-primary px-4 py-12 md:flex md:w-[30%] md:flex-col-reverse">
        <div>
          <Image src={OnboardImage} alt="" />
          <h1 className="text-center text-4xl text-primary-foreground">
            Welcome to <span className="font-bold">fleethr</span>
          </h1>
          <p className="mt-6 text-pretty text-center text-primary-foreground">
            Add your organization, select some modules, add some people and you
            are ready to go.
          </p>
        </div>
      </aside>
      <main className="flex grow justify-center p-4">
        <div className="w-full max-w-xl space-y-4">
          <h1 className="text-2xl md:hidden">
            Welcome to <span className="font-bold">fleethr</span>
          </h1>
          <div className="breadcrumbs text-sm font-medium md:text-xl">
            <ul className="flex font-bold text-muted-foreground md:my-4 md:justify-center md:text-2xl">
              <li className={step === 1 ? "text-primary" : ""}>Organization</li>
              <li className={step === 2 ? "text-primary" : ""}>Subscription</li>
              <li className={step === 3 ? "text-primary" : ""}>People</li>
            </ul>
          </div>
          {renderForm()}
        </div>
      </main>
    </div>
  );
}
