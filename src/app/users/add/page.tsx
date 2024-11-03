import type { Metadata } from "next";

// Components
import { UserForm } from "@/components/organisms/user-form";

// UI
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Add user",
};

export default function AddUser() {
  return (
    <Card className="w-full max-w-[500px]">
      <CardHeader>
        <h1 className="text-2xl font-bold mb-8">Add new user</h1>
      </CardHeader>
      <CardContent>
        <UserForm />
      </CardContent>
    </Card>
  );
}
