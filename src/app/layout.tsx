import type { Metadata } from "next";
import "./globals.css";
import SideNavBar from "@/components/layout/SideNavBar";
import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import BottomNavBar from "@/components/layout/BottomNavBar";

export const metadata: Metadata = {
  title: "eVote Admin | Cavendish University",
  description: "Secure administrative control panel for the Cavendish University e-Vote Electoral System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <head>
        <link rel="icon" type="image/png" href="https://lh3.googleusercontent.com/aida-public/AB6AXuAeApBuNkcIfWbqQA7kHTE5OLuJNROKAvUiAI_7m7g8njlUAm0Qfxt18G8Q36jvR-a-qaxDaHmyR3b3nnzhX6UzAod5CinulfyYHyFkxP4W49YNca-t4LsCDChlBRhXxOJnMwWksg7KDiaMg4CZtisr97RfzAO2lr0ekF22TGXmKl0HBnH8q1gjQ7xSHgZs2LmdkUDMYZ4tvpZ4ovoBhHsXnZQrXPlTVDKFEwXamomwSdgDAo3rgqSjD4A2aQbxDuFr1JBFtBw3wqI" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface antialiased min-h-screen flex">
        {/* Desktop sidebar */}
        <SideNavBar />

        {/* Main content area — offset by sidebar width on large screens */}
        <div className="lg:ml-64 ml-0 min-h-screen flex flex-col flex-grow w-full overflow-x-hidden">
          <TopNavBar />
          <main className="flex-grow px-4 py-6 md:px-6 lg:px-8 lg:py-8 pb-24 lg:pb-8 max-w-screen-2xl mx-auto w-full">
            {children}
          </main>
          <Footer />
        </div>

        {/* Mobile bottom nav — always on top */}
        <BottomNavBar />
      </body>
    </html>
  );
}
