import Organization from "./organization";

export default function GetStarted() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="hidden bg-primary md:block md:min-w-[30%]"></aside>
      <main className="grow p-4 flex justify-center">
        <div className="max-w-xl w-full space-y-4">
          <h1 className="text-3xl font-bold md:hidden">FleetHR</h1>
          <div className="breadcrumbs text-sm font-medium md:text-xl">
            <ul className="flex md:justify-center">
              <li>
                <a>Organization</a>
              </li>
              <li>
                <a>Modules</a>
              </li>
              <li>
                <a>People</a>
              </li>
            </ul>
          </div>
          <Organization />
        </div>
      </main>
    </div>
  );
}
