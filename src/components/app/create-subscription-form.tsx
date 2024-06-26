"use client";

import { api } from "@/trpc/react";
import { ModuleCheckbox } from "@/components/app/module-checkbox";
import { CreateSubscription } from "@/schemas/subscription";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Button,
  Text,
  Loader,
  Radio,
  Checkbox,
  Input,
  SimpleGrid,
  Skeleton,
  NumberFormatter,
  Flex,
} from "@mantine/core";

interface Props {
  onSuccess?: () => void;
  className?: string;
}

export function CreateSubscriptionForm({ onSuccess, className }: Props) {
  const form = useForm<CreateSubscription>({
    mode: "controlled",
    initialValues: {
      modules: [],
      isAutoRenewEnabled: true,
      durationInMonths: 1,
    },

    validate: zodResolver(CreateSubscription),
  });

  const { mutate, status, error } = api.subscription.create.useMutation();
  const {
    data: modules,
    status: modulesStatus,
    error: modulesError,
  } = api.module.getAll.useQuery();
  const { data: subscriptionCharge, isLoading: isChargeLoading } =
    api.module.getSubscriptionCharge.useQuery(
      {
        modulesId: form.getValues().modules,
        durationInMonths: form.getValues().durationInMonths,
      },
      { enabled: form.getValues().modules.length > 0 },
    );

  const handleSubmit = (data: CreateSubscription) => {
    mutate(data);
  };

  useEffect(() => {
    if (status === "success" && onSuccess) onSuccess();
  }, [status, onSuccess]);

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className={cn("space-y-4", className)}
    >
      <Radio.Group
        required
        mt="lg"
        label="Subscription duration"
        size="md"
        key={form.key("durationInMonths")}
        {...form.getInputProps("durationInMonths")}
        value={form.getValues().durationInMonths.toString()}
        onChange={(value) =>
          form.setFieldValue("durationInMonths", parseInt(value))
        }
      >
        <Flex
          my="sm"
          direction={{ base: "column", sm: "row" }}
          gap={{ base: "sm", sm: "lg" }}
        >
          <Radio
            size="md"
            value="1"
            label="Monthly"
            styles={{
              radio: { cursor: "pointer" },
              label: { cursor: "pointer" },
            }}
          />
          <Radio
            size="md"
            value="6"
            label="Half yearly"
            styles={{
              radio: { cursor: "pointer" },
              label: { cursor: "pointer" },
            }}
          />
          <Radio
            size="md"
            value="12"
            label="Yearly"
            styles={{
              radio: { cursor: "pointer" },
              label: { cursor: "pointer" },
            }}
          />
        </Flex>
      </Radio.Group>

      <Input.Wrapper
        required
        mt="xl"
        label="Select modules"
        description="Dependencies will be selected automatically"
        size="md"
        {...form.getInputProps("modules")}
        key={form.key("modules")}
        error={
          form.errors.modules ??
          (modulesError && "Could not load modules, try again later.")
        }
      >
        <SimpleGrid my="md" cols={{ base: 1, md: 2 }}>
          {modulesStatus === "pending" ? (
            <>
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <Skeleton key={idx} h={80} />
                ))}
            </>
          ) : (
            modules?.map((module) => (
              <ModuleCheckbox
                key={module.id}
                checked={form.getValues().modules.includes(module.id)}
                module={module}
                onCheckedChange={(checked) => {
                  // Copy the current selected modules
                  let updatedModules = [...form.getValues().modules];

                  if (checked) {
                    // Add the current module
                    updatedModules = updatedModules.concat(module.id);

                    // Add the dependency if not already selected
                    module.dependsOn.forEach((dependency) => {
                      if (!updatedModules.includes(dependency.id)) {
                        updatedModules.push(dependency.id);
                      }
                    });
                  } else {
                    // Remove the current module
                    updatedModules = updatedModules.filter(
                      (id) => id !== module.id,
                    );

                    // Remove modules that depend on the current module
                    modules.forEach((mod) => {
                      if (mod.dependsOn.find((dep) => dep.id === module.id)) {
                        updatedModules = updatedModules.filter(
                          (id) => id !== mod.id,
                        );
                      }
                    });
                  }

                  // Update the selected modules
                  form.setFieldValue("modules", updatedModules);
                }}
              />
            ))
          )}
        </SimpleGrid>
      </Input.Wrapper>

      <Checkbox
        mt="xl"
        label="Renew automatically"
        size="md"
        {...form.getInputProps("autoRenewal")}
        key={form.key("autoRenewal")}
        checked={form.getValues().isAutoRenewEnabled}
        styles={{ input: { cursor: "pointer" }, label: { cursor: "pointer" } }}
      />

      {isChargeLoading ? (
        <Skeleton h={25} w={300} mt="xl" />
      ) : (
        <Text size="lg" c="teal" fw={700} mt="xl">
          <NumberFormatter
            prefix="$ "
            value={subscriptionCharge}
            thousandSeparator
            suffix={
              form.getValues().durationInMonths === 1
                ? " / month"
                : form.getValues().durationInMonths === 12
                  ? " / year"
                  : ` / ${form.getValues().durationInMonths} months`
            }
            decimalScale={2}
          />
        </Text>
      )}

      {error && (
        <Text c="red">
          {error.data?.code === "BAD_REQUEST"
            ? error.message
            : "Something went wrong, please try again later"}
        </Text>
      )}

      <Button
        type="submit"
        mt="xl"
        size="md"
        autoContrast
        disabled={status === "pending"}
      >
        {status === "pending" ? (
          <>
            <Loader size={20} color="dark.9" mr="sm" /> Creating subscription...
          </>
        ) : (
          "Subscribe"
        )}
      </Button>
    </form>
  );
}
