"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, GraduationCap, Eye } from "lucide-react"

const topCandidates = [
  {
    id: "1",
    name: "Priya Sharma",
    position: "Frontend Developer",
    score: 96,
    location: "Bangalore",
    education: "IIT Delhi",
    skills: ["React", "TypeScript", "Node.js"],
    avatar: "/placeholder.svg?height=40&width=40&text=PS",
    status: "Interview",
  },
  {
    id: "2",
    name: "Rahul Kumar",
    position: "Data Scientist",
    score: 94,
    location: "Mumbai",
    education: "IIT Bombay",
    skills: ["Python", "ML", "TensorFlow"],
    avatar: "/placeholder.svg?height=40&width=40&text=RK",
    status: "Screening",
  },
  {
    id: "3",
    name: "Anita Patel",
    position: "DevOps Engineer",
    score: 92,
    location: "Pune",
    education: "BITS Pilani",
    skills: ["AWS", "Docker", "Kubernetes"],
    avatar: "/placeholder.svg?height=40&width=40&text=AP",
    status: "Applied",
  },
  {
    id: "4",
    name: "Vikram Singh",
    position: "Backend Developer",
    score: 90,
    location: "Hyderabad",
    education: "NIT Warangal",
    skills: ["Java", "Spring", "PostgreSQL"],
    avatar: "/placeholder.svg?height=40&width=40&text=VS",
    status: "Final Round",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Applied":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "Screening":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "Interview":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    case "Final Round":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export function TopCandidates() {
  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="h-5 w-5 mr-2 text-yellow-500" />
          Top Candidates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topCandidates.map((candidate) => (
            <div key={candidate.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{candidate.name}</h4>
                    <p className="text-sm text-muted-foreground">{candidate.position}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{candidate.score}%</div>
                  <div className="text-xs text-muted-foreground">AI Score</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {candidate.location}
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  {candidate.education}
                </div>
                <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {candidate.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  Shortlist
                </Button>
                <Button variant="outline" size="sm">
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
