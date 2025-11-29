// components/BookDetailsModal.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { issueBook } from "@/lib/services/issued_books";
import { useState } from "react";

export default function BookDetailsModal({ open, onOpenChange, book, onFinished }: { open: boolean, onOpenChange: (open: boolean) => void, book: any, onFinished: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBorrow = async () => {
    setIsLoading(true);
    try {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14); // Set due date to 14 days from now
      await issueBook({
        book_id: book.id,
        user_id: JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "{}").id,
        due_date: dueDate.toISOString(),
      });
      onFinished();
    } catch (error) {
      console.error("Failed to borrow book:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{book?.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="relative h-64 w-full">
            <Image
              src={book?.imageUrl || `https://picsum.photos/seed/${book?.id}/400/600`}
              alt={`Cover of ${book?.title}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">{book?.authors?.map((a: any) => a.name).join(", ")}</p>
            <p className="text-sm text-gray-600">{book?.categories?.map((c: any) => c.name).join(", ")}</p>
            <p className="mt-4">{book?.description}</p>
          </div>
          <Button onClick={handleBorrow} disabled={isLoading}>
            {isLoading ? "Borrowing..." : "Borrow"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
