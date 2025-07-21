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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { updateItem } from "@/actions/item.action";
import { useItem } from "@/contexts/ItemContext";
import { useRouter } from "next/navigation";

interface EditItemFormProps {
  item: Item;
  formDisabled: boolean;
}

const formSchema = z.object({
  name: z.string().min(5, "Must be at least 5 characters"),
  description: z.string().optional(),
  sku: z.string().min(3, { message: "Must be at least 3 characters" }),
  category: z.string().optional(),
});

const EditItemForm = ({ item, formDisabled }: EditItemFormProps) => {
  // const { updateItemList } = useItem();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name || "",
      description: item.description || "",
      sku: item.sku || "",
      category: item.category || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      name: values.name,
      description: values.description,
      sku: values.sku,
      category: values.category,
    };

    const result = await updateItem(payload, item.id);

    if (result) {
      // updateItemList(result);
      router.push("/dashboard/items ");
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid-gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Item name"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Description</FormLabel>
                    <FormControl>
                      <Input
                        id="description"
                        name="description"
                        placeholder="Item description"
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
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input
                        id="sku"
                        name="sku"
                        placeholder="SKU"
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
            <div className="gird gap-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Category</FormLabel>
                    <FormControl>
                      <Input
                        id="category"
                        name="category"
                        placeholder="Item category"
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
    </div>
  );
};

export default EditItemForm;
