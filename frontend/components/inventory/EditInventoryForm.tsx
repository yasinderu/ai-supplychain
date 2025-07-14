"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

const formSchema = z.object({
  item_id: z.string(),
  location_id: z.string(),
  quantity: z.string(),
  status: z.literal(["in_stock", "defect", "transfered"]),
});

interface EditInventoryFormProps {
  items: Item[];
  warehouses: Warehouse[];
  inventory: Inventory;
  formDisabled: boolean;
}

const EditInventoryForm = ({
  items,
  warehouses,
  inventory,
  formDisabled,
}: EditInventoryFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location_id: inventory.item.id,
      item_id: inventory.location.id,
      quantity: inventory.quantity.toString(),
      status: inventory.status,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid-gap-3">
              <FormField
                control={form.control}
                name="item_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        disabled={formDisabled}
                        value={inventory.item.id}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select an item" />
                        </SelectTrigger>
                        <SelectContent>
                          {items.map((item, idx) => (
                            <SelectItem key={idx} value={item.id}>
                              {item.name} | <span>{item.sku}</span>
                            </SelectItem>
                          ))}
                          <SelectItem value="1">Item 1</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="location_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        disabled={formDisabled}
                        value={inventory.location.id}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                          {warehouses.map((loc, idx) => (
                            <SelectItem key={idx} value={loc.id}>
                              {loc.name}
                            </SelectItem>
                          ))}
                          {/* <SelectItem value="1">Warehouse 1</SelectItem> */}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        id="quantity"
                        name="quantity"
                        placeholder="quantity"
                        type="number"
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Category</FormLabel>
                    <FormControl>
                      <Input
                        id="status"
                        name="status"
                        placeholder="Status"
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

export default EditInventoryForm;
