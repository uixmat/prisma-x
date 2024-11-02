"use client";
import React from "react";
import { useRouter } from "next/navigation";

// UI
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Components
import { UserForm } from "@/components/organisms/user-form";

// Actions
import { User } from "@prisma/client";

// Props
interface ModalProps {
  user: User;
}

export default function Modal({ user }: ModalProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);

  const handleSuccess = () => {
    setOpen(false);
    router.back();
  };

  return (
    <Dialog open={open} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
        </DialogHeader>
        <UserForm user={user} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
