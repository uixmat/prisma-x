import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Components
import Modal from "./modal";

// Actions
import { getUserById } from "@/lib/actions/user";

export const metadata: Metadata = {
  title: "Edit user",
};

export default async function EditUser({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);

  if (!user) {
    return notFound();
  }

  return <Modal user={user} />;
}
