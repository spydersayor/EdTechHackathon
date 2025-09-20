import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { MetricCard } from "@/components/student/metric-card"
import { HiringMetrics } from "@/components/placement/hiring-metrics"
import { CandidatePipeline } from "@/components/placement/candidate-pipeline"
import { TopCandidates } from "@/components/placement/top-candidates"
import { RecentActivity } from "@/components/placement/recent-activity"
import { LiveActivityFeed } from "@/components/ui/live-activity-feed"
import { Users, Clock, TrendingUp, Target } from "lucide-react"

export default function PlacementDashboard() {
  return (
    <DashboardLayout userRole="placement">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI-Screen Pro: Intelligent Hiring Dashboard</h1>
            <p className="text-muted-foreground mt-1">AI-powered hiring insights and candidate management</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Active Jobs</div>
            <div className="text-2xl font-bold text-foreground">12</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Candidates Screened"
            value={8765}
            subtitle="This month"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            className="bg-blue-500 text-white border-0"
            valueClassName="text-white"
          />
          <MetricCard
            title="Average Time-to-Hire"
            value="12 Days"
            subtitle="Industry avg: 18 days"
            icon={Clock}
            trend={{ value: 8, isPositive: false }}
            className="bg-emerald-500 text-white border-0"
            valueClassName="text-white"
          />
          <MetricCard
            title="Bias Reduction Score"
            value="98%"
            subtitle="AI-powered screening"
            icon={Target}
            trend={{ value: 5, isPositive: true }}
            className="bg-purple-500 text-white border-0"
            valueClassName="text-white"
          />
          <MetricCard
            title="Match Confidence"
            value="92%"
            subtitle="AI accuracy"
            icon={TrendingUp}
            trend={{ value: 3, isPositive: true }}
            className="bg-gradient-to-r from-blue-500 to-red-500 text-white border-0"
            valueClassName="text-white"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HiringMetrics />
          <CandidatePipeline />
        </div>

        {/* Candidates, Activity, and Live Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TopCandidates />
          <RecentActivity />
          <LiveActivityFeed />
        </div>
      </div>
    </DashboardLayout>
  )
}
