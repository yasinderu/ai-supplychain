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
import { userSignup } from "@/actions/auth.action";
import { redirect, RedirectType, useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, { message: "Username at least 2 characters." }),
  password: z
    .string()
    .min(2, { message: "Password must be at least 2 characters." }),
  fullname: z
    .string()
    .min(4, { message: "Fullname must be at least 2 characters." }),
});

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      fullname: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const payload = {
      username: values.username,
      password: values.password,
      fullname: values.fullname,
    };
    const user = await userSignup(payload);

    if (user) {
      redirect("/login", RedirectType.push);
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
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input
                    id="fullname"
                    name="fullname"
                    placeholder="fullname"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
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
          <div className="flex gap-2 items-center justify-end">
            <Button
              onClick={() => router.push("/login")}
              type="button"
              variant="outline"
              className="cursor-pointer"
            >
              Login
            </Button>
            <Button type="submit" className="cursor-pointer">
              Singup
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
