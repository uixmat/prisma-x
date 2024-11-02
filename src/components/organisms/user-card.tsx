"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { toast } from "sonner";

// UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Assets
import {
  MoreHorizontalIcon,
  Mail,
  UserRoundPen,
  ToggleLeft,
  ToggleRight,
  Trash,
} from "lucide-react";

// Types
import { User } from "@prisma/client";

// Actions
import { toggleUserStatus, deleteUser } from "@/lib/actions/user";

export const UserCard = ({ user }: { user: User }) => {
  const pathname = usePathname();

  return (
    <Card key={user.id} className="overflow-clip relative">
      <CardHeader className="flex-row items-center justify-between relative z-10 pb-2">
        <Badge variant="secondary" className="gap-1">
          <span
            className={`w-2 h-2 rounded-full animate-pulse ${
              user.status === "ACTIVE" ? "bg-lime-400" : "bg-red-400"
            }`}
          />{" "}
          {user.status.charAt(0) + user.status.slice(1).toLowerCase()}
        </Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild>
              <Link
                href={`/users/${user.id}/edit`}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <UserRoundPen size={16} /> Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button
                onClick={async () => {
                  try {
                    await toggleUserStatus(user.id, pathname);
                    toast.success(
                      user.status === "ACTIVE"
                        ? "User deactivated successfully"
                        : "User activated successfully"
                    );
                  } catch (error) {
                    console.error("Failed to toggle user status:", error);
                    toast.error("Failed to toggle user status");
                  }
                }}
                className="w-full text-left cursor-pointer flex items-center space-x-2"
              >
                {user.status === "ACTIVE" ? (
                  <>
                    <ToggleLeft size={16} /> Deactivate
                  </>
                ) : (
                  <>
                    <ToggleRight size={16} /> Activate
                  </>
                )}
              </button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button
                onClick={async () => {
                  try {
                    await deleteUser(user.id, pathname);
                    toast.success("User deleted successfully");
                  } catch (error) {
                    console.error("Failed to delete user:", error);
                    toast.error("Failed to delete user");
                  }
                }}
                className="w-full text-left cursor-pointer text-red-500 flex items-center space-x-2"
              >
                <Trash size={16} /> Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="relative">
        <Image
          src={`https://github.com/${user.nickname}.png`}
          alt={user.nickname ?? ""}
          width={64}
          height={64}
          className="scale-[3] blur-lg absolute -top-1/2 left-0 opacity-50"
        />
        <div className="flex flex-col items-center justify-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={`https://github.com/${user.nickname}.png`} />
            <AvatarFallback>{`${user.firstName?.[0]}${user.lastName?.[0]}`}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-full text-center">
            <h2 className="text-lg lg:text-xl font-bold text-ellipsis overflow-hidden whitespace-nowrap">{`${user.firstName} ${user.lastName}`}</h2>
          </div>
          <div className="items-center flex gap-2 text-xs font-mono text-muted-foreground">
            <Mail size={14} />
            {user.email}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
