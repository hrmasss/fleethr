"use client";

import type { Notices } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/app/data-table";
import { Badge } from "@mantine/core";
import { SortableTableHeader } from "@/components/app/sortable-table-header";

interface Props {
  notices: Notices;
}

export default function NoticeDataTable({ notices }: Props) {
  const columns: ColumnDef<Notices[0]>[] = [
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <SortableTableHeader
          label="Publish date"
          sortDirection={column.getIsSorted()}
          toggleSort={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => {
        const notice = row.original;

        return (
          <div className="min-w-48">
            {notice.createdAt.toLocaleDateString("en-UK")}
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <SortableTableHeader
          label="Publish date"
          sortDirection={column.getIsSorted()}
          toggleSort={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        />
      ),
      cell: ({ row }) => {
        const notice = row.original;

        return <div className="min-w-48">{notice.title}</div>;
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => {
        const notice = row.original;

        return (
          <div className="flex min-w-48 flex-wrap gap-2">
            {notice.tags.length !== 0 ? (
              notice.tags.map((tag, idx) => (
                <Badge variant="light" key={idx} className="cursor-pointer">
                  {tag}
                </Badge>
              ))
            ) : (
              <span className="text-destructive text-sm">N/A</span>
            )}
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={notices} filterBy="title" />;
}
