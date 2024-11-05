"use client";

import React from "react";
import { usePathname } from "next/navigation";

// UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

// Assets
import { Loader } from "lucide-react";

// Actions
import { createUser, updateUser } from "@/lib/actions/user";
import { User } from "@prisma/client";

// Form Schema
const formSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters")
    .min(1, "First name is required"),
  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters")
    .min(1, "Last name is required"),
  nickname: z
    .string()
    .min(3, "Nickname must be at least 3 characters")
    .min(1, "Nickname is required"),
});

// Props
interface UserFormProps {
  user?: User;
  onSuccess?: () => void;
}

export function UserForm({ user, onSuccess }: UserFormProps) {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Form values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      nickname: user?.nickname || "",
    },
  });

  // Form submit
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      if (user) {
        await updateUser(user.id, values, pathname);
        toast.success("User updated successfully");
      } else {
        await createUser(values, pathname);
        toast.success("User created successfully");
      }
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error(
        user ? "Error updating user:" : "Error creating user:",
        error
      );
      toast.error(user ? "Error updating user" : "Error creating user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-md"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="john@doe.com"
                  autoFocus
                  autoComplete="off"
                  autoCorrect="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="John"
                  autoComplete="off"
                  autoCorrect="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Doe"
                  autoComplete="off"
                  autoCorrect="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="eg. prisma"
                  autoComplete="off"
                  autoCorrect="off"
                />
              </FormControl>
              <FormDescription>
                We&apos;ll use their Github avatar!
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full md:w-min"
        >
          {isSubmitting && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {user ? "Update" : "Create"} User
        </Button>
      </form>
    </Form>
  );
}
