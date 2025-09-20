"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users } from "lucide-react"

const pipelineStages = [
  { stage: "Applied", count: 1247, percentage: 100, color: "bg-blue-500" },
  { stage: "Screened", count: 456, percentage: 37, color: "bg-green-500" },
  { stage: "Interview", count: 89, percentage: 7, color: "bg-purple-500" },
  { stage: "Final Round", count: 23, percentage: 2, color: "bg-orange-500" },
  { stage: "Offered", count: 12, percentage: 1, color: "bg-emerald-500" },
]

export function CandidatePipeline() {
  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Candidate Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pipelineStages.map((stage, index) => (
            <div key={stage.stage} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                  <span className="font-medium">{stage.stage}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{stage.percentage}%</span>
                  <Badge variant="secondary">{stage.count}</Badge>
                </div>
              </div>
              <Progress value={stage.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
