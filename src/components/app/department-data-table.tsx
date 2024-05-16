"use client";

import type { Departments } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/app/data-table";
import { SortableTableHeader } from "@/components/app/sortable-table-header";

interface Props {
  departments: Departments;
}

export default function DepartmentsDataTable({ departments }: Props) {
  const columns: ColumnDef<Departments[0]>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <SortableTableHeader
          label="Name"
          sortDirection={column.getIsSorted()}
          toggleSort={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => {
        const department = row.original;

        return <div className="min-w-48">{department.name}</div>;
      },
    },
  ];

  return <DataTable columns={columns} data={departments} filterBy="name" />;
}
