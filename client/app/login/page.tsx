"use client";
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
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
});

type LoginFormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentid: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Form submitted with:", data);
    router.push("/home");
  };

  return (
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
              Login
            </h1>
            <p className="text-muted-foreground text-sm">
              Your gateway to knowledge
            </p>
          </div>
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
                      maxLength={6}
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
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2">
              <Checkbox className="bg-white" id="remember" />
              <Label htmlFor="remember">Remember Me</Label>
            </div>
            <Link href="/forgotpassword">
              <small className="text-sm leading-none font-medium text-green-700">
                Forgot Password?
              </small>
            </Link>
          </div>
          <Button
            className="cursor-pointer rounded-full bg-blue-700 px-10 text-lg hover:bg-blue-600"
            type="submit"
          >
            Login
          </Button>
          <div className="mt-3 flex w-full justify-center">
            <small className="text-sm leading-none font-medium">
              {"Don't have an account?"}{" "}
              <Link className="text-green-700" href="/signup">
                Sign up
              </Link>
            </small>
          </div>
        </form>
      </Form>
    </div>
  );
}
