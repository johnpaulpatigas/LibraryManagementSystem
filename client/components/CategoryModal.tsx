// components/CategoryModal.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CategoryForm from "./CategoryForm";

export default function CategoryModal({ open, onOpenChange, category, onFinished }: { open: boolean, onOpenChange: (open: boolean) => void, category: any, onFinished: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? "Edit Category" : "Add Category"}</DialogTitle>
        </DialogHeader>
        <CategoryForm category={category} onFinished={onFinished} />
      </DialogContent>
    </Dialog>
  );
}
