export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen lg:flex">
      <aside className="hidden w-1/5 border-r bg-card p-6 shadow-sm lg:flex">
        Sidebar
      </aside>
      <div className="sticky top-0 border-b bg-card/90 p-2 shadow-sm backdrop-blur lg:hidden">
        navbar
      </div>
      <div className="grow overflow-y-auto p-2 md:p-6">{children}</div>
    </div>
  );
}
