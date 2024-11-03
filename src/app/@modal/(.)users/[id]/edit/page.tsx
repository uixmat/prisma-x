import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Components
import Modal from "./modal";

// Actions
import { getUserById } from "@/lib/actions/user";

export const metadata: Metadata = {
  title: "Edit user",
};

export default async function EditUser({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    return notFound();
  }

  return <Modal user={user} />;
}
