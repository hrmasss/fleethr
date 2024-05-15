"use client";

import type { Notices } from "@/lib/types";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/app/data-table";
import { UnstyledButton, Group, Text, Badge, Center, rem } from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";

interface Props {
  notices: Notices;
}

export default function NoticeDataTable({ notices }: Props) {
  const columns: ColumnDef<Notices[0]>[] = [
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        const Icon =
          column.getIsSorted() === "asc"
            ? IconChevronUp
            : column.getIsSorted() === "desc"
              ? IconChevronDown
              : IconSelector;

        return (
          <UnstyledButton
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full py-[var(--mantine-spacing-xs)]"
          >
            <Group justify="space-between">
              <Text fw={500} fz="sm">
                Publish date
              </Text>
              <Center className="size-[rem(21px)] rounded-[rem(21px)]">
                <Icon
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </Center>
            </Group>
          </UnstyledButton>
        );
      },
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
      header: ({ column }) => {
        const Icon =
          column.getIsSorted() === "asc"
            ? IconChevronUp
            : column.getIsSorted() === "desc"
              ? IconChevronDown
              : IconSelector;

        return (
          <UnstyledButton
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full py-[var(--mantine-spacing-xs)]"
          >
            <Group justify="space-between">
              <Text fw={500} fz="sm">
                Title
              </Text>
              <Center className="size-[rem(21px)] rounded-[rem(21px)]">
                <Icon
                  style={{ width: rem(16), height: rem(16) }}
                  stroke={1.5}
                />
              </Center>
            </Group>
          </UnstyledButton>
        );
      },
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

  return <DataTable columns={columns} data={notices} />;
}
