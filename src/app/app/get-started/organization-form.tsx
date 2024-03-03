"use client";

import { api } from "@/trpc/react";
import { createOrganizationSchema } from "@/schemas/organization";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  onSuccess: () => void;
}

export default function OrganizationForm({ onSuccess }: Props) {
  const { mutate, error, isSuccess, isLoading } =
    api.organization.create.useMutation();

  const { toast } = useToast();

  const form = useForm<createOrganizationSchema>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      maxSize: "20",
      description: "",
    },
  });

  function onSubmit(values: createOrganizationSchema) {
    mutate(values);
  }

  useEffect(() => {
    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success!",
        description: "Organization data saved successfully.",
      });
      onSuccess();
    }
  }, [isSuccess, toast, onSuccess]);

  return (
    <div>
      <h3 className="text-xl font-bold">Organization details</h3>
      <p className="text-sm text-muted-foreground">
        You can add other information or update them later from settings.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Organization Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Maximum members
                  <p className="text-sm text-muted-foreground">
                    This will affect module pricing
                  </p>
                </FormLabel>
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
                          value="20"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">20</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          className="border-foreground text-foreground"
                          value="100"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">100</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          className="border-foreground text-foreground"
                          value="500"
                        />
                      </FormControl>
                      <FormLabel className="font-normal">500</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your organization description here."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
