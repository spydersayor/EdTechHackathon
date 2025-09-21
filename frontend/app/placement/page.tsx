"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { MetricCard } from "@/components/student/metric-card"
import { FileText, Briefcase, Target, TrendingUp } from "lucide-react"

export default function PlacementDashboard() {
  return (
    <DashboardLayout userRole="placement">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Placement Dashboard</h1>
            <p className="text-muted-foreground">
              Manage placements and track student progress
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Last updated</div>
            <div className="text-sm font-medium">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Open Positions"
            value={42}
            subtitle="Active jobs"
            icon={Briefcase}
            trend={{ value: 10, isPositive: true }}
            className="bg-blue-500 text-white"
          />
          <MetricCard
            title="Applications"
            value={350}
            subtitle="This month"
            icon={FileText}
            trend={{ value: 20, isPositive: true }}
            className="bg-emerald-500 text-white"
          />
          <MetricCard
            title="Interviews Scheduled"
            value={87}
            subtitle="Ongoing"
            icon={Target}
            trend={{ value: 7, isPositive: true }}
            className="bg-amber-500 text-white"
          />
          <MetricCard
            title="Offers Made"
            value={25}
            subtitle="Confirmed"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
            className="bg-purple-500 text-white"
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
