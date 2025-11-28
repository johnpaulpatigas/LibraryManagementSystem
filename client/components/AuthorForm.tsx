// components/AuthorForm.tsx
"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createAuthor, updateAuthor } from "@/lib/services/authors";

const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
});

type AuthorFormValues = z.infer<typeof formSchema>;

export default function AuthorForm({ author, onFinished }: { author: any, onFinished: () => void }) {
  const form = useForm<AuthorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: author?.name || "",
    },
  });

  const onSubmit = async (data: AuthorFormValues) => {
    try {
      if (author) {
        await updateAuthor(author.id, data);
      } else {
        await createAuthor(data);
      }
      onFinished();
    } catch (error) {
      console.error("Failed to save author:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
