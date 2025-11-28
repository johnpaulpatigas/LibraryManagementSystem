// components/AuthorModal.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthorForm from "./AuthorForm";

export default function AuthorModal({ open, onOpenChange, author, onFinished }: { open: boolean, onOpenChange: (open: boolean) => void, author: any, onFinished: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{author ? "Edit Author" : "Add Author"}</DialogTitle>
        </DialogHeader>
        <AuthorForm author={author} onFinished={onFinished} />
      </DialogContent>
    </Dialog>
  );
}
