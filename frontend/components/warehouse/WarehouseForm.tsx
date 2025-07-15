"use client";

import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

interface EditWarehouseFormProps {
  warehouse: Warehouse;
  formDisabled: boolean;
}

const formSchema = z.object({
  name: z.string().min(5, "Must be at least 5 characters"),
  address: z.string(),
});

const EditWarehouseForm = ({
  warehouse,
  formDisabled,
}: EditWarehouseFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: warehouse.name || "",
      address: warehouse.address || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid-gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warehouse name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Warehouse name"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={formDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Warehouse address"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={formDisabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={formDisabled}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditWarehouseForm;
