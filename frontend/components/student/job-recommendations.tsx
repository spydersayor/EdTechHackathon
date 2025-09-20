"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, MapPin, Clock, Star } from "lucide-react"

const recommendations = [
  {
    id: "1",
    company: "InnovateTech",
    position: "React Developer",
    location: "Bangalore",
    type: "Full-time",
    matchScore: 94,
    logo: "/placeholder.svg?height=40&width=40&text=IT",
    skills: ["React", "TypeScript", "Node.js"],
    postedDays: 2,
  },
  {
    id: "2",
    company: "NextGen Systems",
    position: "Full Stack Developer",
    location: "Hyderabad",
    type: "Full-time",
    matchScore: 89,
    logo: "/placeholder.svg?height=40&width=40&text=NG",
    skills: ["Python", "Django", "React"],
    postedDays: 5,
  },
  {
    id: "3",
    company: "CodeCraft",
    position: "Frontend Engineer",
    location: "Pune",
    type: "Internship",
    matchScore: 86,
    logo: "/placeholder.svg?height=40&width=40&text=CC",
    skills: ["Vue.js", "JavaScript", "CSS"],
    postedDays: 1,
  },
]

export function JobRecommendations() {
  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Star className="h-5 w-5 mr-2 text-yellow-500" />
          AI Job Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((job) => (
            <div key={job.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={job.logo || "/placeholder.svg"} />
                    <AvatarFallback>
                      <Building2 className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{job.position}</h4>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{job.matchScore}%</div>
                  <div className="text-xs text-muted-foreground">Match</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {job.postedDays}d ago
                </div>
                <Badge variant="secondary">{job.type}</Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  Apply Now
                </Button>
                <Button variant="outline" size="sm">
                  Save
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
