"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userSignin } from "@/actions/auth.action";
import { redirect, RedirectType } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, { message: "Username at least 2 characters." }),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters." }),
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      username: values.username,
      password: values.password,
    };
    const token = await userSignin(payload);

    if (token) {
      redirect("/dashboard", RedirectType.push);
    }
  };

  return (
    <div className="w-xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    id="username"
                    name="username"
                    placeholder="username"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}
          <Button type="submit" className="cursor-pointer">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
