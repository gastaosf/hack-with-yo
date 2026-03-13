export const dynamic = "force-dynamic";

import { AuthGuard } from "@/components/layout/AuthGuard";
import { BottomNav } from "@/components/layout/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen bg-[#fafaf5]">
        <main className="flex-1 overflow-y-auto pb-20">{children}</main>
        <BottomNav />
      </div>
    </AuthGuard>
  );
}
