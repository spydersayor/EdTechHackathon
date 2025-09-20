"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { TrendingUp, Users, Clock, Target, Download, Calendar } from "lucide-react"

const hiringTrends = [
  { month: "Jul", applications: 420, hired: 8, interviews: 42 },
  { month: "Aug", applications: 520, hired: 12, interviews: 52 },
  { month: "Sep", applications: 380, hired: 6, interviews: 38 },
  { month: "Oct", applications: 680, hired: 15, interviews: 68 },
  { month: "Nov", applications: 750, hired: 18, interviews: 75 },
  { month: "Dec", applications: 620, hired: 14, interviews: 62 },
]

const sourceData = [
  { name: "Job Portals", value: 45, color: "#3b82f6" },
  { name: "Campus Hiring", value: 30, color: "#10b981" },
  { name: "Referrals", value: 15, color: "#f59e0b" },
  { name: "Social Media", value: 10, color: "#ef4444" },
]

const skillsInDemand = [
  { skill: "React", demand: 85, growth: 12 },
  { skill: "Python", demand: 78, growth: 8 },
  { skill: "Node.js", demand: 72, growth: 15 },
  { skill: "AWS", demand: 68, growth: 20 },
  { skill: "Machine Learning", demand: 65, growth: 25 },
  { skill: "Docker", demand: 58, growth: 18 },
]

export default function AnalyticsPage() {
  return (
    <DashboardLayout userRole="placement">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Insights</h1>
            <p className="text-muted-foreground">Data-driven hiring insights and performance metrics</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3%</div>
              <p className="text-xs text-muted-foreground">+0.4% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time to Fill</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18 days</div>
              <p className="text-xs text-muted-foreground">-2 days from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2/5</div>
              <p className="text-xs text-muted-foreground">+0.3 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Candidates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+156 from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Hiring Trends</CardTitle>
              <CardDescription>Applications, interviews, and hires over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hiringTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="applications" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="interviews" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="hired" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Candidate Sources</CardTitle>
              <CardDescription>Where your best candidates come from</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Skills in Demand */}
        <Card>
          <CardHeader>
            <CardTitle>Skills in Demand</CardTitle>
            <CardDescription>Most requested skills and their growth trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillsInDemand.map((skill) => (
                <div key={skill.skill} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 text-sm font-medium">{skill.skill}</div>
                    <div className="flex-1 bg-muted rounded-full h-2 min-w-[200px]">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.demand}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{skill.demand}%</span>
                    <Badge variant="secondary" className="text-xs">
                      +{skill.growth}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
            <CardDescription>Key insights and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-green-600">Strengths</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    High-quality candidate pool with 92% match accuracy
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Reduced time-to-hire by 15% compared to industry average
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Strong campus hiring pipeline with 30% of total applications
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-orange-600">Opportunities</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    Increase referral program to boost quality applications
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    Focus on cloud computing skills training for candidates
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    Optimize interview process to reduce candidate drop-off
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
