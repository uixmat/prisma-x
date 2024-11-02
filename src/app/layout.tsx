import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Providers
import { ThemeProvider } from "@/components/providers/theme-provider";

// UI
import { Toaster } from "@/components/ui/sonner";

// Organisms
import { Header } from "@/components/organisms/header";
import { Footer } from "@/components/organisms/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Prisma Challenge",
  description: "A Prisma take home assignment by Matt Litherland",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex flex-col container mx-auto p-8 pt-[69px] min-h-screen">
            {children}
            <Footer />
          </div>
          {modal}
          <Toaster closeButton position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
