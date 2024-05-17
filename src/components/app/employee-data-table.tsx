"use client";

import type { Employees } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/app/data-table";
import { SortableTableHeader } from "@/components/app/sortable-table-header";

interface Props {
  employees: Employees;
}

export default function EmployeeDataTable({ employees }: Props) {
  const columns: ColumnDef<Employees[0]>[] = [
    {
      accessorKey: "employeeId",
      header: ({ column }) => (
        <SortableTableHeader
          label="Employee ID"
          sortDirection={column.getIsSorted()}
          toggleSort={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => {
        const employee = row.original;

        return <div className="min-w-48">{employee.employeeId}</div>;
      },
    },
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
        const employee = row.original;

        return <div className="min-w-48">{employee.name}</div>;
      },
    },
    {
      accessorKey: "jobTitle",
      header: ({ column }) => (
        <SortableTableHeader
          label="Title"
          sortDirection={column.getIsSorted()}
          toggleSort={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => {
        const employee = row.original;

        return <div className="min-w-48">{employee.jobTitle}</div>;
      },
    },
    {
      accessorKey: "department.name",
      header: ({ column }) => (
        <SortableTableHeader
          label="Department"
          sortDirection={column.getIsSorted()}
          toggleSort={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => {
        const employee = row.original;

        return <div className="min-w-48">{employee.department.name}</div>;
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <SortableTableHeader
          label="Email"
          sortDirection={column.getIsSorted()}
          toggleSort={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => {
        const employee = row.original;

        return <div className="min-w-48">{employee.email}</div>;
      },
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <SortableTableHeader
          label="Phone"
          sortDirection={column.getIsSorted()}
          toggleSort={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => {
        const employee = row.original;

        return <div className="min-w-48">{employee.phone}</div>;
      },
    },
  ];

  return <DataTable columns={columns} data={employees} filterBy="name" />;
}
