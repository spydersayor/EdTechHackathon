"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts"

const data = [
  { skill: "Frontend", student: 85, required: 90 },
  { skill: "Backend", student: 75, required: 80 },
  { skill: "Database", student: 70, required: 75 },
  { skill: "DevOps", student: 60, required: 70 },
  { skill: "Testing", student: 65, required: 65 },
  { skill: "Communication", student: 90, required: 85 },
]

export function SkillMatchRadar() {
  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle>Skill Match Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="Your Skills" dataKey="student" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            <Radar name="Required" dataKey="required" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
