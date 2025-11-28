// app/(student)/settings/page.tsx
"use client";
import StudentLayout from "@/components/StudentLayout";
import { useEffect, useState } from "react";
import { getProfile } from "@/lib/services/auth";
import { updateUserProfile, changePassword } from "@/lib/services/users";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const SettingsCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg bg-[#EAE8E3] p-8 shadow-md">
    <h2 className="mb-6 text-2xl font-semibold text-gray-800">{title}</h2>
    {children}
  </div>
);

const profileFormSchema = z.object({
  fullname: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email address."),
});

const passwordFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),
  newPassword: z.string().min(6, "New password must be at least 6 characters."),
  confirmPassword: z.string().min(1, "Confirm password is required."),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

export default function SettingsPage() {
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullname: "",
      email: "",
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        profileForm.reset(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, [profileForm]);

  const onProfileSubmit = async (data: z.infer<typeof profileFormSchema>) => {
    setProfileMessage(null);
    setProfileError(null);
    try {
      await updateUserProfile(data);
      setProfileMessage("Profile updated successfully!");
    } catch (error: any) {
      setProfileError(error.response?.data?.error || "Failed to update profile.");
    }
  };

  const onPasswordSubmit = async (data: z.infer<typeof passwordFormSchema>) => {
    setPasswordMessage(null);
    setPasswordError(null);
    try {
      await changePassword(data);
      setPasswordMessage("Password updated successfully!");
      passwordForm.reset();
    } catch (error: any) {
      setPasswordError(error.response?.data?.error || "Failed to change password.");
    }
  };

  return (
    <StudentLayout activePage="Settings" headerTitle="Settings">
      <SettingsCard title="Profile Information">
        <Form {...profileForm}>
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
            {profileMessage && <p className="text-green-600">{profileMessage}</p>}
            {profileError && <p className="text-red-600">{profileError}</p>}
            <FormField
              control={profileForm.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="mt-1 block w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={profileForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} className="mt-1 block w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-2">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </SettingsCard>

      <SettingsCard title="Update Password">
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
            {passwordMessage && <p className="text-green-600">{passwordMessage}</p>}
            {passwordError && <p className="text-red-600">{passwordError}</p>}
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="mt-1 block w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="mt-1 block w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} className="mt-1 block w-full rounded-md border border-gray-400 px-3 py-2 shadow-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-2">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </SettingsCard>
    </StudentLayout>
  );
}
