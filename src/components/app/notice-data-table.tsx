"use client";

import { api } from "@/trpc/react";
import type { Notices } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/app/data-table";
import { Badge } from "@mantine/core";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import DataTableActions from "@/components/app/data-table-actions";
import { SortableTableHeader } from "@/components/app/sortable-table-header";

interface Props {
  notices: Notices;
}

export default function NoticeDataTable({ notices }: Props) {
  const { data: organization } = api.organization.get.useQuery();
  const { mutate, status, error } = api.notice.delete.useMutation();
  const router = useRouter();

  useEffect(() => {
    if (status === "error") {
      notifications.show({
        title: "Delete failed!",
        color: "red",
        message: "Please refresh the page if records aren't updated.",
        withBorder: true,
      });

      console.error(error);
    } else if (status === "success") {
      notifications.show({
        title: "Delete success!",
        color: "green",
        message: "Please refresh the page if records aren't updated.",
        withBorder: true,
      });

      router.refresh();
    }
  }, [status, router, error]);

  function handleDelete(id: string) {
    mutate({ id });
  }

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
            {notice.createdAt.toLocaleDateString("en-GB")}
          </div>
        );
      },
    },
    {
      accessorKey: "title",
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
        const notice = row.original;

        return <div className="min-w-48">{notice.title}</div>;
      },
    },
    {
      accessorKey: "isPublic",
      header: "Visibility",
      cell: ({ row }) => {
        const notice = row.original;

        return (
          <div className="min-w-48">
            {notice.isPublic ? (
              <Badge variant="dot" color="orange">
                Public
              </Badge>
            ) : (
              <Badge variant="dot">Internal</Badge>
            )}
          </div>
        );
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
              <Badge variant="light" color="red">
                N/A
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="sr-only">Actions</div>,
      cell: ({ row }) => {
        const notice = row.original;

        return (
          <DataTableActions
            viewUrl={
              notice.isPublic
                ? `/org/${organization?.slug}/notice/${notice.id}`
                : `/app/notice/internal/${notice.id}`
            }
            editUrl="/app/notice/manage/new"
            onDelete={() => handleDelete(notice.id)}
          />
        );
      },
    },
  ];

  return <DataTable columns={columns} data={notices} filterBy="title" />;
}
