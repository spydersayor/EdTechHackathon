"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, User, FileText, Briefcase, TrendingUp } from "lucide-react"

interface Activity {
  id: string
  type: "application" | "resume_update" | "job_match" | "score_update"
  user: string
  action: string
  timestamp: Date
  metadata?: any
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "application",
    user: "Sarah Chen",
    action: "applied to Software Engineer at Google",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: "2",
    type: "resume_update",
    user: "Mike Johnson",
    action: "updated resume - score improved to 92%",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "3",
    type: "job_match",
    user: "Alex Rivera",
    action: "matched with 5 new job opportunities",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
  },
]

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities)

  useEffect(() => {
    const interval = setInterval(() => {
      const names = ["Emma Wilson", "David Park", "Lisa Zhang", "Tom Brown", "Anna Davis"]
      const actions = [
        "applied to Data Scientist at Microsoft",
        "updated skills profile",
        "received interview invitation",
        "completed assessment test",
        "matched with new opportunities",
      ]

      const newActivity: Activity = {
        id: Date.now().toString(),
        type: ["application", "resume_update", "job_match", "score_update"][Math.floor(Math.random() * 4)] as any,
        user: names[Math.floor(Math.random() * names.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        timestamp: new Date(),
      }

      setActivities((prev) => [newActivity, ...prev.slice(0, 19)])
    }, 15000) // Every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: string) => {
    switch (type) {
      case "application":
        return <Briefcase className="h-4 w-4 text-blue-500" />
      case "resume_update":
        return <FileText className="h-4 w-4 text-green-500" />
      case "job_match":
        return <TrendingUp className="h-4 w-4 text-purple-500" />
      case "score_update":
        return <TrendingUp className="h-4 w-4 text-orange-500" />
      default:
        return <User className="h-4 w-4 text-gray-500" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Live Activity Feed</h3>
        <Badge variant="secondary" className="bg-green-500/20 text-green-400">
          Live
        </Badge>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-500 ${
              index === 0
                ? "bg-blue-500/10 border border-blue-500/20 animate-in slide-in-from-top-2"
                : "hover:bg-gray-750"
            }`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={`/abstract-geometric-shapes.png?height=32&width=32&query=${activity.user}`} />
              <AvatarFallback className="text-xs">
                {activity.user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {getIcon(activity.type)}
                <span className="text-white text-sm font-medium">{activity.user}</span>
              </div>
              <p className="text-gray-400 text-sm">{activity.action}</p>
              <div className="flex items-center gap-1 mt-2">
                <Clock className="h-3 w-3 text-gray-500" />
                <span className="text-gray-500 text-xs">{formatTime(activity.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
