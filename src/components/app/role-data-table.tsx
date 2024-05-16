"use client";

import type { Roles } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/app/data-table";
import { SortableTableHeader } from "@/components/app/sortable-table-header";

interface Props {
  roles: Roles;
}

export default function RoleDataTable({ roles }: Props) {
  const columns: ColumnDef<Roles[0]>[] = [
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
        const role = row.original;

        return <div className="min-w-48">{role.name}</div>;
      },
    },
  ];

  return <DataTable columns={columns} data={roles} filterBy="name" />;
}
