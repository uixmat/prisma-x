"use client";
import React from "react";
import { useRouter } from "next/navigation";

// Hooks
import { useMediaQuery } from "@/lib/hooks/use-media-query";

// UI
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

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
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleSuccess = () => {
    setOpen(false);
    setTimeout(() => {
      router.back();
    }, 150);
  };

  const formContainerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (formContainerRef.current) {
        formContainerRef.current.style.setProperty(
          "bottom",
          `env(safe-area-inset-bottom)`
        );
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
      handleResize();
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  if (isDesktop) {
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

  return (
    <Drawer
      open={open}
      onOpenChange={() => {
        setOpen(false);
        setTimeout(() => {
          router.back();
        }, 150);
      }}
      modal
      preventScrollRestoration={false}
      direction="bottom"
    >
      <DrawerContent ref={formContainerRef}>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit user</DrawerTitle>
        </DrawerHeader>

        <UserForm user={user} onSuccess={handleSuccess} />
      </DrawerContent>
    </Drawer>
  );
}
