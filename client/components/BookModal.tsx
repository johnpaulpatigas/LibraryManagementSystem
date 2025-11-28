// components/BookModal.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BookForm from "./BookForm";

export default function BookModal({ open, onOpenChange, book, onFinished }: { open: boolean, onOpenChange: (open: boolean) => void, book: any, onFinished: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{book ? "Edit Book" : "Add Book"}</DialogTitle>
        </DialogHeader>
        <BookForm book={book} onFinished={onFinished} />
      </DialogContent>
    </Dialog>
  );
}
