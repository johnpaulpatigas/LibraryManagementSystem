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
  status: z.enum(["pending", "approved", "rejected"]).optional(), // Added status field
});

type BookRequestFormValues = z.infer<typeof formSchema>;

export default function BookRequestForm({ bookRequest, onFinished }: { bookRequest: any, onFinished: () => void }) {
  const form = useForm<BookRequestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      book_title: bookRequest?.book_title || "",
      author_name: bookRequest?.author_name || "",
      status: bookRequest?.status || "pending", // Default to pending if not provided
    },
  });

  const onSubmit = async (data: BookRequestFormValues) => {
    try {
      if (bookRequest) {
        // Send all fields for update
        await updateBookRequest(bookRequest.id, {
          book_title: data.book_title,
          author_name: data.author_name,
          status: data.status,
        });
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
        {bookRequest && ( // Only show status for existing book requests
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
