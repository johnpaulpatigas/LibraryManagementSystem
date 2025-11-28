"use client";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/lib/services/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  studentid: z
    .string()
    .min(1, "Student ID is required.")
    .regex(/^[0-9]+$/, "Student ID must only contain numbers."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/^\S*$/, "Password must not contain any spaces."),
  rememberMe: z.boolean().default(false).optional(),
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentid: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await login(data.studentid, data.password);
      const { user } = response;

      if (user.role === "admin") {
        router.push("/a-dashboard");
      } else {
        router.push("/s-dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.error || "An unexpected error occurred.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Login" subtitle="Your gateway to knowledge">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="w-full space-y-3">
            <FormField
              control={form.control}
              name="studentid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-mediumbold">
                    Student ID
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="bg-white"
                      placeholder="Enter your Student ID"
                      maxLength={8}
                      {...field}
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
                  <FormLabel className="text-md font-mediumbold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-white"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-y-0 space-x-2">
                  <FormControl>
                    <Checkbox
                      className="bg-white"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Remember Me</FormLabel>
                </FormItem>
              )}
            />

            <a href="/forgot-password">
              <small className="text-sm leading-none font-medium text-green-700">
                Forgot Password?
              </small>
            </a>
          </div>
          <Button
            className="w-full cursor-pointer rounded-full bg-blue-700 px-10 text-lg hover:bg-blue-600"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          <div className="mt-3 flex w-full justify-center">
            <small className="text-sm leading-none font-medium">
              {"Don't have an account?"}{" "}
              <a className="text-green-700" href="/signup">
                Sign up
              </a>
            </small>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
