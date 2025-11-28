// components/BookRequestModal.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BookRequestForm from "./BookRequestForm";

export default function BookRequestModal({ open, onOpenChange, bookRequest, onFinished }: { open: boolean, onOpenChange: (open: boolean) => void, bookRequest: any, onFinished: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{bookRequest ? "Edit Book Request" : "Create Book Request"}</DialogTitle>
        </DialogHeader>
        <BookRequestForm bookRequest={bookRequest} onFinished={onFinished} />
      </DialogContent>
    </Dialog>
  );
}
