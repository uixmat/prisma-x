import Link from "next/link";

// UI
import { Button } from "@/components/ui/button";

// Components
import { ThemeSwitch } from "@/components/atoms/theme-switch";
import { PrismaLogo } from "@/components/atoms/logos/prisma";

export const Header = () => {
  return (
    <header className="flex justify-between items-center bg-background/70 backdrop-blur-sm p-4 fixed top-0 left-0 right-0 w-full z-10 text-foreground">
      <div className="flex items-center gap-4">
        <PrismaLogo fill="currentColor" />
        <nav className="flex items-center space-x-2">
          <Button variant="link" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/users">Users</Link>
          </Button>
        </nav>
      </div>
      <ThemeSwitch />
    </header>
  );
};
