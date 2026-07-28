import type { Metadata } from "next";
import "./globals.css";
import SideNavBar from "@/components/layout/SideNavBar";
import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import BottomNavBar from "@/components/layout/BottomNavBar";

export const metadata: Metadata = {
  title: "e-Vote | Student Dashboard",
  description: "Cavendish University e-Vote System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/assets/e-Vote-Logo.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface antialiased min-h-screen flex">
        <SideNavBar />
        <div className="lg:ml-64 ml-0 min-h-screen flex flex-col flex-grow w-full">
          <TopNavBar />
          <main className="flex-grow lg:p-margin-desktop p-4 pb-20 lg:pb-0 max-w-container-max mx-auto w-full">
            {children}
          </main>
          <Footer />
        </div>
        <BottomNavBar />
      </body>
    </html>
  );
}
