"use client";

import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSubscriptionSchema } from "@/schemas/subscription";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  onSuccess: () => void;
}

export default function SubscriptionForm({ onSuccess }: Props) {
  const { data: modules } = api.module.getAll.useQuery();
  // const { mutate, error, isSuccess } = api.organization.create.useMutation();

  const { toast } = useToast();

  const form = useForm<createSubscriptionSchema>({
    resolver: zodResolver(createSubscriptionSchema),
    defaultValues: {
      modules: [],
      type: "MONTHLY",
      autoRenewal: false,
    },
  });

  function onSubmit(data: createSubscriptionSchema) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  // useEffect(() => {
  //   if (error) {
  //     toast({
  //       title: "Uh oh! Something went wrong.",
  //       description: error.message,
  //       variant: "destructive",
  //     });
  //   }
  // }, [error, toast]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast({
  //       title: "Success!",
  //       description: "Organization data saved successfully.",
  //     });
  //     onSuccess();
  //   }
  // }, [isSuccess, toast, onSuccess]);

  return (
    <div>
      <h3 className="text-xl font-bold">Subscription</h3>
      <p className="text-sm text-muted-foreground">
        You can complete payment later.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subscription type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          className="border-foreground text-foreground"
                          value="MONTHLY"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Monthly</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          className="border-foreground text-foreground"
                          value="YEARLY"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">Yearly</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="modules"
            render={() => (
              <FormItem>
                <FormLabel>
                  Select modules
                  <p className="text-sm text-muted-foreground">
                    Click on a module to see it&apos;s details. Select modules
                    using the checkbox. All dependencies will be selected
                    automatically.
                  </p>
                </FormLabel>
                <div className="grid gap-4 space-y-0 md:grid-cols-2">
                  {modules?.map((module) => (
                    <FormField
                      key={module.id}
                      control={form.control}
                      name="modules"
                      render={({ field }) => {
                        return (
                          <FormItem key={module.id}>
                            <Card
                              key={module.id}
                              className="group relative ring-primary transition-all duration-100 hover:ring-1"
                            >
                              <FormControl>
                                <Checkbox
                                  className="absolute right-4 top-4 ring-primary group-hover:animate-pulse group-hover:ring-2"
                                  checked={field.value?.includes(module.id)}
                                  onCheckedChange={(checked) => {
                                    // Copy the current selected modules
                                    let updatedModules = [...field.value];

                                    if (checked) {
                                      // Add the current module
                                      updatedModules = updatedModules.concat(
                                        module.id,
                                      );

                                      // Add the dependency if not already selected
                                      module.dependsOn.forEach((dependency) => {
                                        if (
                                          !updatedModules.includes(
                                            dependency.id,
                                          )
                                        ) {
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
                                        if (
                                          mod.dependsOn.find(
                                            (dep) => dep.id === module.id,
                                          )
                                        ) {
                                          updatedModules =
                                            updatedModules.filter(
                                              (id) => id !== mod.id,
                                            );
                                        }
                                      });
                                    }

                                    // Update the selected modules
                                    field.onChange(updatedModules);
                                  }}
                                />
                              </FormControl>
                              <CardContent className="p-4">
                                <CardTitle>{module.name}</CardTitle>
                                <CardDescription className="mt-1">
                                  {module.price === 0
                                    ? "Free"
                                    : `$ ${module.price}`}
                                </CardDescription>
                              </CardContent>
                            </Card>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
