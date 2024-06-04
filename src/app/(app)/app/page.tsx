import { BarChart } from "@mantine/charts";
import DashboardStats from "@/components/app/dashboard-stats";

const data = [
  { month: "January", Employee: 12, Admin: 9, Others: 2 },
  { month: "February", Employee: 19, Admin: 12, Others: 4 },
  { month: "March", Employee: 4, Admin: 10, Others: 2 },
  { month: "April", Employee: 10, Admin: 2, Others: 8 },
  { month: "May", Employee: 8, Admin: 14, Others: 12 },
  { month: "June", Employee: 7, Admin: 6, Others: 10 },
];

export default function Page() {
  return (
    <main>
      <div>
        <h3 className="my-2 text-xl font-bold md:text-3xl">Dashboard</h3>

        <p className="max-w-xl">
          Here you can find some statistics about your organization.
        </p>

        <div className="my-8">
          <DashboardStats />
        </div>
      </div>

      <div>
        <h3 className="mt-8 text-lg font-bold md:text-xl">
          Employee History
        </h3>

        <BarChart
          h={300}
          data={data}
          withLegend
          dataKey="month"
          series={[
            { name: "Employee", color: "violet.6" },
            { name: "Admin", color: "blue.6" },
            { name: "Others", color: "teal.6" },
          ]}
          tickLine="y"
        />
      </div>
    </main>
  );
}
