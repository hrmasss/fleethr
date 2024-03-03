"use client";

import { api } from "@/trpc/react";
import { useEffect, useState } from "react";
import Organization from "./organization";

export default function GetStarted() {
  const [step, setStep] = useState(0);
  const { data: organization } = api.organization.get.useQuery();

  const handleSuccess = (message: string) => {
    console.log(message);

    setStep((prev) => prev + 1);
  };

  useEffect(() => {
    if (organization) {
      setStep(1);
    }
  }, [organization]);

  const renderForm = () => {
    switch (step) {
      case 0:
        return <Organization onSuccess={handleSuccess} />;
      case 1:
        return <p>Step 2 </p>;
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
              <li
                className={step === 0 ? "text-primary" : "cursor-pointer"}
                onClick={() => setStep(0)}
              >
                Organization
              </li>
              <li className={step === 1 ? "text-primary" : "cursor-pointer"}>
                Modules
              </li>
              <li className={step === 2 ? "text-primary" : "cursor-pointer"}>
                People
              </li>
            </ul>
          </div>
          {renderForm()}
        </div>
      </main>
    </div>
  );
}
