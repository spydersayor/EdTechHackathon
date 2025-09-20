"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Share2,
  Bookmark,
  Send,
  Eye,
  TrendingUp,
  Star,
} from "lucide-react"

interface JobDetailViewProps {
  jobId: string
  userRole: "student" | "placement"
}

// Mock job data
const mockJob = {
  id: "1",
  title: "Senior Frontend Developer",
  company: "TechCorp",
  location: "Bangalore, India",
  type: "Full-time",
  experience: "3-5 years",
  salary: "₹15-25 LPA",
  posted: "2024-01-15",
  deadline: "2024-02-15",
  applicants: 156,
  views: 1247,
  status: "Active",
  logo: "/placeholder.svg?height=60&width=60&text=TC",
  description: {
    summary:
      "We are looking for a passionate Senior Frontend Developer to join our growing team. You will be responsible for building the next generation of our web applications using modern technologies.",
    responsibilities: [
      "Develop and maintain responsive web applications using React and TypeScript",
      "Collaborate with designers and backend developers to implement user interfaces",
      "Optimize applications for maximum speed and scalability",
      "Write clean, maintainable, and well-documented code",
      "Participate in code reviews and mentor junior developers",
      "Stay up-to-date with the latest frontend technologies and best practices",
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in frontend development",
      "Strong proficiency in React, JavaScript, and TypeScript",
      "Experience with modern CSS frameworks and preprocessors",
      "Knowledge of version control systems (Git)",
      "Excellent problem-solving and communication skills",
    ],
  },
  skills: {
    mustHave: ["React", "TypeScript", "JavaScript", "CSS", "HTML"],
    goodToHave: ["Node.js", "GraphQL", "Redux", "Webpack", "Jest"],
  },
  benefits: ["Health Insurance", "Flexible Hours", "Remote Work", "Learning Budget", "Stock Options"],
  team: [
    { name: "Sarah Wilson", role: "Engineering Manager", avatar: "/placeholder.svg?height=40&width=40&text=SW" },
    { name: "John Doe", role: "Senior Developer", avatar: "/placeholder.svg?height=40&width=40&text=JD" },
    { name: "Jane Smith", role: "Product Designer", avatar: "/placeholder.svg?height=40&width=40&text=JS" },
  ],
  matchScore: 92, // For students
}

export function JobDetailView({ jobId, userRole }: JobDetailViewProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  const handleApply = () => {
    setHasApplied(true)
    // In real app, this would trigger the application process
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={mockJob.logo || "/placeholder.svg"} />
                <AvatarFallback>
                  <Building2 className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold mb-1">{mockJob.title}</h1>
                <p className="text-lg text-muted-foreground mb-2">{mockJob.company}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {mockJob.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Posted {new Date(mockJob.posted).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {mockJob.type}
                  </div>
                </div>
              </div>
            </div>

            {userRole === "student" && (
              <div className="text-right">
                <div className="flex items-center mb-2">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="text-lg font-bold text-green-600">{mockJob.matchScore}%</span>
                  <span className="text-sm text-muted-foreground ml-1">Match</span>
                </div>
                <Badge className="bg-green-100 text-green-800">Excellent Match</Badge>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="font-medium">{mockJob.salary}</span>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{mockJob.applicants} applicants</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
                <span>{mockJob.views} views</span>
              </div>
              <Badge variant="secondary">{mockJob.experience}</Badge>
            </div>

            <div className="flex space-x-2">
              {userRole === "student" && (
                <>
                  <Button variant="outline" onClick={handleBookmark}>
                    <Bookmark className={`h-4 w-4 mr-2 ${isBookmarked ? "fill-current" : ""}`} />
                    {isBookmarked ? "Saved" : "Save"}
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button onClick={handleApply} disabled={hasApplied}>
                    <Send className="h-4 w-4 mr-2" />
                    {hasApplied ? "Applied" : "Apply Now"}
                  </Button>
                </>
              )}
              {userRole === "placement" && (
                <>
                  <Button variant="outline">Edit Job</Button>
                  <Button variant="outline">View Applications</Button>
                  <Button>Promote Job</Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {userRole === "student" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Your Match Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Match</span>
                  <span className="text-sm font-medium">{mockJob.matchScore}%</span>
                </div>
                <Progress value={mockJob.matchScore} className="h-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Skills Match</p>
                  <p className="font-medium text-green-600">95%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Experience Match</p>
                  <p className="font-medium text-yellow-600">88%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Location Match</p>
                  <p className="font-medium text-green-600">100%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Job Description */}
      <Card>
        <CardHeader>
          <CardTitle>Job Description</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">About the Role</h3>
            <p className="text-muted-foreground">{mockJob.description.summary}</p>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Key Responsibilities</h3>
            <ul className="space-y-2">
              {mockJob.description.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Qualifications</h3>
            <ul className="space-y-2">
              {mockJob.description.qualifications.map((qualification, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{qualification}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Skills & Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Skills & Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2 text-red-600">Must-Have Skills</h4>
            <div className="flex flex-wrap gap-2">
              {mockJob.skills.mustHave.map((skill) => (
                <Badge key={skill} variant="destructive">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-blue-600">Good-to-Have Skills</h4>
            <div className="flex flex-wrap gap-2">
              {mockJob.skills.goodToHave.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Benefits & Perks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {mockJob.benefits.map((benefit) => (
              <Badge key={benefit} variant="secondary">
                {benefit}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team */}
      <Card>
        <CardHeader>
          <CardTitle>Meet the Team</CardTitle>
          <CardDescription>People you'll be working with</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockJob.team.map((member, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                <Avatar>
                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {userRole === "student" && !hasApplied && (
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold">Ready to Apply?</h3>
              <p className="text-muted-foreground">
                This position matches {mockJob.matchScore}% of your profile. Don't miss this opportunity!
              </p>
              <Button size="lg" onClick={handleApply}>
                <Send className="h-4 w-4 mr-2" />
                Apply for this Position
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
