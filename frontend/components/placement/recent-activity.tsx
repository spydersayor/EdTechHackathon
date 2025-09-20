"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, UserPlus, FileText, Calendar, MessageSquare } from "lucide-react"

const activities = [
  {
    id: "1",
    type: "application",
    user: "Sarah Wilson",
    action: "applied for Frontend Developer position",
    time: "2 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32&text=SW",
    icon: UserPlus,
  },
  {
    id: "2",
    type: "interview",
    user: "Recruitment Team",
    action: "scheduled interview with Priya Sharma",
    time: "15 minutes ago",
    avatar: "/placeholder.svg?height=32&width=32&text=RT",
    icon: Calendar,
  },
  {
    id: "3",
    type: "resume",
    user: "AI System",
    action: "analyzed resume for Rahul Kumar (Score: 94%)",
    time: "1 hour ago",
    avatar: "/placeholder.svg?height=32&width=32&text=AI",
    icon: FileText,
  },
  {
    id: "4",
    type: "note",
    user: "John Doe",
    action: "added note to Anita Patel's profile",
    time: "2 hours ago",
    avatar: "/placeholder.svg?height=32&width=32&text=JD",
    icon: MessageSquare,
  },
  {
    id: "5",
    type: "application",
    user: "Mike Johnson",
    action: "applied for DevOps Engineer position",
    time: "3 hours ago",
    avatar: "/placeholder.svg?height=32&width=32&text=MJ",
    icon: UserPlus,
  },
]

export function RecentActivity() {
  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  <activity.icon className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{activity.user}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
