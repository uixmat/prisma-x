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

export default function Modal() {
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
          <DialogTitle>Add user</DialogTitle>
        </DialogHeader>
        <UserForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
