"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Applied", value: 12, color: "#10b981" },
  { name: "In Review", value: 8, color: "#3b82f6" },
  { name: "Interview", value: 3, color: "#f59e0b" },
  { name: "Rejected", value: 5, color: "#ef4444" },
  { name: "Offered", value: 2, color: "#8b5cf6" },
]

export function ApplicationStatusChart() {
  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle>Application Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
