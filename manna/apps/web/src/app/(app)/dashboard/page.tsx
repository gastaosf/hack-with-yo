import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { YieldSummary } from "@/components/dashboard/YieldSummary";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#fafaf5]">
      <DashboardHeader />
      <BalanceCard />
      <QuickActions />
      <YieldSummary />
      <ActivityFeed />
    </div>
  );
}
