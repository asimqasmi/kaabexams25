import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/layouts/Navbar";
import Sidebar from "@/components/layouts/Sidebar";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <SessionProvider>
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
            <Navbar />
            {children}
          </main>
        </div>
      </SessionProvider>

      <Toaster richColors />
    </main>
  );
}
