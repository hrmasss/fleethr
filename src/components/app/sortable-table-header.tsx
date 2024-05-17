import { UnstyledButton, Group, Text, Center, rem } from "@mantine/core";
import { type SortDirection } from "@tanstack/react-table";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";

interface SortableTableHeaderProps {
  label: string;
  sortDirection: false | SortDirection;
  toggleSort: () => void;
}

export const SortableTableHeader = ({
  label,
  sortDirection,
  toggleSort,
}: SortableTableHeaderProps) => {
  const Icon =
    sortDirection === "asc"
      ? IconChevronUp
      : sortDirection === "desc"
        ? IconChevronDown
        : IconSelector;

  return (
    <UnstyledButton
      onClick={toggleSort}
      className="w-full py-[var(--mantine-spacing-xs)]"
    >
      <Group justify="space-between" style={{flexWrap: "nowrap"}}>
        <Text fw="bold" fz="sm" style={{textWrap: "nowrap"}}>
          {label}
        </Text>
        <Center className="size-[rem(21px)] rounded-[rem(21px)]">
          <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
        </Center>
      </Group>
    </UnstyledButton>
  );
};
