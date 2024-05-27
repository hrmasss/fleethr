"use client";

import Link from "next/link";
import { Menu, ActionIcon } from "@mantine/core";
import { IconDots, IconEdit, IconTrash, IconEye } from "@tabler/icons-react";

interface Props {
  viewUrl?: string;
  editUrl?: string;
  onDelete?: () => void;
}

export default function DataTableActions({
  viewUrl,
  editUrl,
  onDelete,
}: Props) {
  return (
    <Menu shadow="md" radius="md" position="bottom-end">
      <Menu.Target>
        <ActionIcon variant="default" className="border-none">
          <IconDots className="size-6" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {viewUrl && (
          <Menu.Item component={Link} href={viewUrl} leftSection={<IconEye />}>
            View
          </Menu.Item>
        )}
        {editUrl && (
          <Menu.Item component={Link} href={editUrl} leftSection={<IconEdit />}>
            Edit
          </Menu.Item>
        )}
        {onDelete && (
          <Menu.Item color="red" leftSection={<IconTrash />} onClick={onDelete}>
            Delete
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
