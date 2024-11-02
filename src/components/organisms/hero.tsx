import Link from "next/link";
import Image from "next/image";

// UI
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// MagicUI
import HyperText from "@/components/ui/hyper-text";
import DotPattern from "@/components/ui/dot-pattern";

// Actions
import { getAllUsers } from "@/lib/actions/user";

// Assets
import { UserPlus, Users, MoreHorizontalIcon } from "lucide-react";

// Utils
import { cn } from "@/lib/utils";

export const Hero = async () => {
  const users = await getAllUsers();

  return (
    <div className="flex flex-col items-center justify-center min-h-96 space-y-10 py-32">
      <div className="text-center">
        <HyperText
          className="text-2xl md:text-4xl lg:text-6xl font-bold text-black dark:text-white"
          text="Matt's Prisma Challenge"
          duration={10}
        />
        <p className="text-lg text-foreground/70">
          A simple app to add, edit, and delete users.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button asChild size="lg">
          <Link href="/users">
            <Users size={16} /> View users
          </Link>
        </Button>
        <Button variant="outline" asChild size="lg">
          <Link href="/users/add">
            <UserPlus size={16} /> Add New User
          </Link>
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center space-y-3">
        <div className="flex items-center">
          {users.slice(0, 5).map((user) => {
            const avatarClass = cn(
              "flex items-center space-x-2 w-12 h-12 rounded-full border-2 border-foreground object-cover overflow-clip bg-muted",
              users.length > 1 && "-ml-3"
            );
            return (
              <Image
                key={user.id}
                className={avatarClass}
                src={`https://github.com/${user.nickname}.png`}
                alt={user.nickname ?? ""}
                width={64}
                height={64}
              />
            );
          })}
          <Link
            href="/users/"
            className="flex items-center justify-center space-x-2 w-12 h-12 rounded-full border-2 border-foreground object-cover overflow-clip bg-muted -ml-3"
          >
            <MoreHorizontalIcon size={16} className="text-muted-foreground" />
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Badge variant="secondary" className="flex items-center gap-2 w-fit">
            {users.length} {users.length === 1 ? "User" : "Users"}
          </Badge>
        </div>
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
};
