// components/UserModal.tsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserForm from "./UserForm";

export default function UserModal({ open, onOpenChange, user, onFinished }: { open: boolean, onOpenChange: (open: boolean) => void, user: any, onFinished: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
        </DialogHeader>
        <UserForm user={user} onFinished={onFinished} />
      </DialogContent>
    </Dialog>
  );
}
