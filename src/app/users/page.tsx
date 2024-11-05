import type { Metadata } from "next";
import Link from "next/link";

// Actions
import { getAllUsers } from "@/lib/actions/user";

// UI
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Magic UI
import DotPattern from "@/components/ui/dot-pattern";

// Organisms
import { UserCard } from "@/components/organisms/user-card";

// Utils
import { cn } from "@/lib/utils";

// Assets
import { Users, UserPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Users",
};

// Disable caching - feels super hacky :/
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const users = await getAllUsers();

  // Calculate active and inactive user counts
  const activeCount = users.filter((user) => user.status === "ACTIVE").length;
  const inactiveCount = users.filter(
    (user) => user.status === "INACTIVE"
  ).length;

  return (
    <div className="w-full flex flex-col space-y-4 pt-8">
      <div className="flex items-center space-x-2">
        <Users size={24} />
        <h1 className="text-2xl font-bold">Users</h1>
      </div>
      <div className="flex items-center space-x-2 justify-between w-full">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="gap-1">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />{" "}
            Active {activeCount}
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />{" "}
            Inactive {inactiveCount}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/users/add">
              <UserPlus size={16} /> Add user
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] opacity-50 -z-10"
        )}
      />
    </div>
  );
}
