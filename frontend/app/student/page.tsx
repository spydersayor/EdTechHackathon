import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { MetricCard } from "@/components/student/metric-card"
import { ApplicationStatusChart } from "@/components/student/application-status-chart"
import { SkillMatchRadar } from "@/components/student/skill-match-radar"
import { RecentApplications } from "@/components/student/recent-applications"
import { JobRecommendations } from "@/components/student/job-recommendations"
import { LiveActivityFeed } from "@/components/ui/live-activity-feed"
import { FileText, Briefcase, Target, TrendingUp } from "lucide-react"

export default function StudentDashboard() {
  return (
    <DashboardLayout userRole="student">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <p className="text-muted-foreground">Track your applications and discover new opportunities</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Last updated</div>
            <div className="text-sm font-medium">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Applications"
            value={30}
            subtitle="This month"
            icon={Briefcase}
            trend={{ value: 15, isPositive: true }}
            className="bg-blue-500 text-white"
          />
          <MetricCard
            title="Resume Score"
            value="87%"
            subtitle="AI Analysis"
            icon={FileText}
            trend={{ value: 8, isPositive: true }}
            className="bg-emerald-500 text-white"
          />
          <MetricCard
            title="Interview Rate"
            value="23%"
            subtitle="Success rate"
            icon={Target}
            trend={{ value: 5, isPositive: true }}
            className="bg-purple-500 text-white"
          />
          <MetricCard
            title="Skill Match Avg"
            value="84%"
            subtitle="Job compatibility"
            icon={TrendingUp}
            trend={{ value: 12, isPositive: true }}
            className="bg-orange-500 text-white"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ApplicationStatusChart />
          <SkillMatchRadar />
        </div>

        {/* Applications, Recommendations, and Live Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentApplications />
          <JobRecommendations />
          <LiveActivityFeed />
        </div>
      </div>
    </DashboardLayout>
  )
}
