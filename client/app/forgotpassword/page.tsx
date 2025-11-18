"use client";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.email({
    message: "Please enter a valid email to send a reset link.",
  }),
});

type ForgotPasswordFormValues = z.infer<typeof formSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log("Password reset requested for email:", data.email);

    alert("If an account with that email exists, a reset link has been sent.");
    router.push("/login");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[rgb(50,70,70)]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-130 flex-col items-center space-y-3 rounded-3xl bg-[rgb(200,220,220)] p-10 px-15"
        >
          <div className="mb-10 flex flex-col items-center">
            <h1 className="text-center text-3xl font-extrabold tracking-tight">
              Forgot Password?
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your email to receive a reset link.
            </p>
          </div>
          <div className="w-full space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-mediumbold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="bg-white"
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="cursor-pointer rounded-full bg-blue-700 px-10 text-lg hover:bg-blue-600"
            type="submit"
          >
            Send Reset Link
          </Button>
          <div className="mt-3 flex w-full justify-center">
            <small className="text-sm leading-none font-medium">
              <Link className="text-green-700" href="/login">
                ← Back to Login
              </Link>
            </small>
          </div>
        </form>
      </Form>
    </div>
  );
}
