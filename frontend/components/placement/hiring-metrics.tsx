"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const hiringData = [
  { month: "Jan", applications: 450, hired: 12, interviews: 45 },
  { month: "Feb", applications: 520, hired: 15, interviews: 52 },
  { month: "Mar", applications: 380, hired: 8, interviews: 38 },
  { month: "Apr", applications: 680, hired: 18, interviews: 68 },
  { month: "May", applications: 750, hired: 22, interviews: 75 },
  { month: "Jun", applications: 620, hired: 16, interviews: 62 },
]

export function HiringMetrics() {
  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle>Hiring Pipeline Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hiringData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="applications" fill="#3b82f6" name="Applications" />
            <Bar dataKey="interviews" fill="#10b981" name="Interviews" />
            <Bar dataKey="hired" fill="#8b5cf6" name="Hired" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
