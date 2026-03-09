import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { YieldSummary } from "@/components/dashboard/YieldSummary";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function DashboardPage() {
  return (
    <div className="page-enter pb-6">
      <DashboardHeader />
      <BalanceCard />
      <QuickActions />
      <YieldSummary />
      <ActivityFeed />
    </div>
  );
}
