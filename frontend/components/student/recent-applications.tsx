"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, Calendar, Eye } from "lucide-react"

const applications = [
  {
    id: "1",
    company: "TechCorp",
    position: "Frontend Developer",
    appliedDate: "2024-01-15",
    status: "Interview",
    logo: "/placeholder.svg?height=40&width=40&text=TC",
    matchScore: 92,
  },
  {
    id: "2",
    company: "DataFlow Inc",
    position: "Data Analyst",
    appliedDate: "2024-01-12",
    status: "In Review",
    logo: "/placeholder.svg?height=40&width=40&text=DF",
    matchScore: 87,
  },
  {
    id: "3",
    company: "CloudTech",
    position: "DevOps Engineer",
    appliedDate: "2024-01-10",
    status: "Applied",
    logo: "/placeholder.svg?height=40&width=40&text=CT",
    matchScore: 78,
  },
  {
    id: "4",
    company: "AI Solutions",
    position: "ML Engineer",
    appliedDate: "2024-01-08",
    status: "Offered",
    logo: "/placeholder.svg?height=40&width=40&text=AI",
    matchScore: 95,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Applied":
      return "bg-blue-100 text-blue-800"
    case "In Review":
      return "bg-yellow-100 text-yellow-800"
    case "Interview":
      return "bg-purple-100 text-purple-800"
    case "Offered":
      return "bg-green-100 text-green-800"
    case "Rejected":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function RecentApplications() {
  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={app.logo || "/placeholder.svg"} />
                  <AvatarFallback>
                    <Building2 className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{app.position}</h4>
                  <p className="text-sm text-muted-foreground">{app.company}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(app.appliedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium">{app.matchScore}% Match</div>
                  <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
