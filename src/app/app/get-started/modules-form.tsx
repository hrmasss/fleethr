"use client";

import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  onSuccess: () => void;
}

const ModulesFormSchema = z.object({
  modules: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one module.",
  }),
});

export default function ModulesForm({ onSuccess }: Props) {
  const { data: modules } = api.module.getAll.useQuery();
  // const { mutate, error, isSuccess } = api.organization.create.useMutation();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof ModulesFormSchema>>({
    resolver: zodResolver(ModulesFormSchema),
    defaultValues: {
      modules: [],
    },
  });

  function onSubmit(data: z.infer<typeof ModulesFormSchema>) {
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
      <h3 className="text-xl font-bold">Select modules</h3>
      <p className="text-sm text-muted-foreground">
        Click on a module to see it&apos;s details. Select modules using the
        checkbox. All dependencies will be selected automatically.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="modules"
            render={() => (
              <FormItem className="py-8">
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
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          module.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== module.id,
                                          ),
                                        );
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
