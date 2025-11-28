// components/BookForm.tsx
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
import { createBook, updateBook } from "@/lib/services/books";

const formSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().optional(),
  isbn: z.string().optional(),
  quantity: z.preprocess(
    (val) => (val === undefined || val === null ? 0 : Number(val)),
    z.number().int().min(0, "Quantity must be a positive number."),
  ),
  available_quantity: z.preprocess(
    (val) => (val === undefined || val === null ? 0 : Number(val)),
    z.number().int().min(0, "Available quantity must be a positive number."),
  ),
});

type BookFormValues = {
  title: string;
  description?: string;
  isbn?: string;
  quantity?: number;
  available_quantity?: number;
};

export default function BookForm({ book, onFinished }: { book: any, onFinished: () => void }) {
  const form = useForm<BookFormValues>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      title: book?.title || "",
      description: book?.description || "",
      isbn: book?.isbn || "",
      quantity: Number(book?.quantity || 0),
      available_quantity: Number(book?.available_quantity || 0),
    },
  });

  const onSubmit = async (data: BookFormValues) => {
    try {
      if (book) {
        await updateBook(book.id, data);
      } else {
        await createBook(data);
      }
      onFinished();
    } catch (error) {
      console.error("Failed to save book:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter book description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input placeholder="Enter ISBN" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter quantity" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="available_quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter available quantity" {...field} />
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
