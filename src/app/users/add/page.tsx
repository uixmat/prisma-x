import type { Metadata } from "next";
import { UserForm } from "@/components/organisms/user-form";

export const metadata: Metadata = {
  title: "Add user",
};

export default function AddUser() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-8">Add new user</h1>
      <UserForm />
    </>
  );
}
