"use client";

import classes from "@/styles/components/module-checkbox.module.css";
import { useUncontrolled } from "@mantine/hooks";
import type { Module } from "@prisma/client";
import {
  UnstyledButton,
  Checkbox,
  Text,
  type CheckboxProps,
} from "@mantine/core";

interface ModuleCheckboxProps extends CheckboxProps {
  onCheckedChange?: (checked: boolean) => void;
  module: Module;
}

export function ModuleCheckbox({
  checked,
  onCheckedChange,
  module,
  ...props
}: ModuleCheckboxProps) {
  const [value, handleChange] = useUncontrolled({
    value: checked,
    onChange: onCheckedChange,
  });

  return (
    <UnstyledButton
      onClick={() => handleChange(!value)}
      className={classes.button}
    >
      <Checkbox
        checked={value}
        onChange={() => null}
        tabIndex={-1}
        size="md"
        mr="md"
        styles={{ input: { cursor: "pointer" } }}
        aria-hidden
        {...props}
      />

      <div>
        <Text fw={500} mb={5} lh={1}>
          {module.name}
        </Text>
        <Text fz="sm" c="dimmed">
          {module.description}
        </Text>
        <Text fz="sm" fw={500}>
          {module.price === 0 ? "Free" : `$ ${module.price.toFixed(2)} / month / member`}
        </Text>
      </div>
    </UnstyledButton>
  );
}
