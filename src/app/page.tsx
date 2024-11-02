// Components
import { Hero } from "@/components/organisms/hero";

// UI
import { Card } from "@/components/ui/card";

export default async function Home() {
  return (
    <>
      <Hero />
      <div className="flex w-full items-center justify-center">
        <Card className="p-6 w-full max-w-[500px] text-center">
          <h2 className="text-2xl font-bold mb-3">Thank you!</h2>
          <p className="text-sm text-muted-foreground">
            A little note to say thank you so much for having me in the process
            and taking the time to review my submission. I had a lot of fun
            working on this and I&apos;m grateful for the opportunity 🤍
          </p>
          <p className="text-sm text-muted-foreground"></p>
        </Card>
      </div>
    </>
  );
}
