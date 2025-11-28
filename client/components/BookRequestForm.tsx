// components/BookRequestForm.tsx
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
import { createBookRequest, updateBookRequest } from "@/lib/services/book_requests";

const formSchema = z.object({
  book_title: z.string().min(1, "Book title is required."),
  author_name: z.string().optional(),
});

type BookRequestFormValues = z.infer<typeof formSchema>;

export default function BookRequestForm({ bookRequest, onFinished }: { bookRequest: any, onFinished: () => void }) {
  const form = useForm<BookRequestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      book_title: bookRequest?.book_title || "",
      author_name: bookRequest?.author_name || "",
    },
  });

  const onSubmit = async (data: BookRequestFormValues) => {
    try {
      if (bookRequest) {
        await updateBookRequest(bookRequest.id, data);
      } else {
        await createBookRequest(data);
      }
      onFinished();
    } catch (error) {
      console.error("Failed to save book request:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="book_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Name</FormLabel>
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
