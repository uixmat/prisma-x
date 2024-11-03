import type { Metadata } from "next";

// Components
import { UserForm } from "@/components/organisms/user-form";

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

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Edit user</h1>

      {user && <UserForm user={user} />}
    </>
  );
}
