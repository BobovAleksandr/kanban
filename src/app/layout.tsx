import type { Metadata } from "next";
import { Toaster } from "@/app/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "kanban",
  description: "kanban доска для замето и задач",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="bg-gray-100 p-4 relative h-screen">
        {children}
        <Toaster richColors theme="light" className="absolute"/>
      </body>
    </html>
  );
}
