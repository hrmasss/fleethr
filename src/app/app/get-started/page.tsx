"use client";

import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import OrganizationForm from "./organization-form";
import FormSkeleton from "./form-skeleton";

export default function GetStarted() {
  const [step, setStep] = useState(0);
  const { data: organization, isLoading: orgLoading } =
    api.organization.get.useQuery();
  const subscription = false; // Retrive subscription data from server

  useEffect(() => {
    if (organization && subscription) {
      setStep(3);
    } else if (organization && !subscription) {
      setStep(2);
    } else if (!orgLoading) setStep(1);
  }, [organization, subscription, orgLoading]);

  const renderForm = () => {
    switch (step) {
      case 0:
        return <FormSkeleton />;
      case 1:
        return <OrganizationForm />;
      case 2:
        return <p>Step 2 </p>;
      case 3:
        return <p>Step 3 </p>;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="hidden bg-primary md:block md:min-w-[30%]"></aside>
      <main className="flex grow justify-center p-4">
        <div className="w-full max-w-xl space-y-4">
          <h1 className="text-3xl font-bold md:hidden">FleetHR</h1>
          <div className="breadcrumbs text-sm font-medium md:text-xl">
            <ul className="flex font-bold text-muted-foreground md:my-4 md:justify-center md:text-2xl">
              <li className={step === 1 ? "text-primary" : ""}>Organization</li>
              <li className={step === 2 ? "text-primary" : ""}>Modules</li>
              <li className={step === 3 ? "text-primary" : ""}>People</li>
            </ul>
          </div>
          {renderForm()}
        </div>
      </main>
    </div>
  );
}
