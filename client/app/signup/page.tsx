"use client";
import AuthGuard from "@/components/AuthGuard";
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
import axios from "axios";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters."),
  studentid: z
    .string()
    .min(1, "Student ID is required.")
    .regex(/^[0-9]+$/, "Student ID must only contain numbers."),
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/^\S*$/, "Password must not contain any spaces."),
});

type SignupFormValues = z.infer<typeof formSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      studentid: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        data,
      );

      console.log("Signup successful:", response.data);

      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Signup failed:", err);
      const errorMessage =
        err.response?.data?.error ||
        "An unexpected error occurred. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthGuard isPrivate={false}>
      <div className="flex h-screen w-screen items-center justify-center bg-[rgb(50,70,70)]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-130 flex-col items-center space-y-3 rounded-3xl bg-[rgb(200,220,220)] p-10 px-15"
          >
            <div className="mb-10 flex flex-col items-center">
              <Image
                className="mb-3"
                src="/globe.svg"
                alt="logo"
                width={60}
                height={60}
              />
              <h1 className="text-center text-3xl font-extrabold tracking-tight">
                User Sign Up
              </h1>
              <p className="text-muted-foreground text-sm">
                Your journey to knowledge begins here
              </p>
            </div>

            {error && <p className="pb-2 text-sm text-red-600">{error}</p>}

            <div className="w-full space-y-3">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-mediumbold">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-white"
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md font-mediumbold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="bg-white"
                        placeholder="Enter your email"
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
            <Button
              className="mt-4 w-full cursor-pointer rounded-full bg-blue-700 px-10 text-lg hover:bg-blue-600"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
            <div className="mt-3 flex w-full items-center justify-center gap-2">
              <small className="text-sm leading-none font-medium">
                <Link
                  className="flex items-center justify-center gap-2 text-green-700"
                  href="/login"
                >
                  <MoveLeft color="#3c9d2f" size={10} strokeWidth={3} />
                  Back to Login
                </Link>
              </small>
            </div>
          </form>
        </Form>
      </div>
    </AuthGuard>
  );
}
