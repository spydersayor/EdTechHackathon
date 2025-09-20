import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, GraduationCap, Search, Filter, Eye, Star, MessageSquare } from "lucide-react"

const candidates = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    position: "Frontend Developer",
    location: "Bangalore",
    education: "IIT Delhi - B.Tech CSE",
    experience: "2 years",
    score: 96,
    status: "Interview",
    avatar: "/placeholder.svg?height=40&width=40&text=PS",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    appliedJobs: ["Senior Frontend Developer", "React Developer"],
  },
  {
    id: "2",
    name: "Rahul Kumar",
    email: "rahul.kumar@email.com",
    position: "Data Scientist",
    location: "Mumbai",
    education: "IIT Bombay - M.Tech AI",
    experience: "3 years",
    score: 94,
    status: "Screening",
    avatar: "/placeholder.svg?height=40&width=40&text=RK",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    appliedJobs: ["Data Scientist", "ML Engineer"],
  },
  {
    id: "3",
    name: "Anita Patel",
    email: "anita.patel@email.com",
    position: "DevOps Engineer",
    location: "Pune",
    education: "BITS Pilani - B.E CSE",
    experience: "4 years",
    score: 92,
    status: "Applied",
    avatar: "/placeholder.svg?height=40&width=40&text=AP",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins"],
    appliedJobs: ["DevOps Engineer", "Cloud Engineer"],
  },
  {
    id: "4",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    position: "Backend Developer",
    location: "Hyderabad",
    education: "NIT Warangal - B.Tech CSE",
    experience: "1 year",
    score: 90,
    status: "Final Round",
    avatar: "/placeholder.svg?height=40&width=40&text=VS",
    skills: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
    appliedJobs: ["Backend Developer", "Java Developer"],
  },
  {
    id: "5",
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    position: "UI/UX Designer",
    location: "Chennai",
    education: "NID Ahmedabad - M.Des",
    experience: "2 years",
    score: 88,
    status: "Shortlisted",
    avatar: "/placeholder.svg?height=40&width=40&text=SR",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    appliedJobs: ["UI/UX Designer", "Product Designer"],
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
    case "Shortlisted":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "Rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export default function CandidatesPage() {
  return (
    <DashboardLayout userRole="placement">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Candidates</h1>
            <p className="text-muted-foreground">Manage and review candidate applications</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Export</Button>
            <Button>Bulk Actions</Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search candidates..." className="pl-10" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">Sort by Score</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidates List */}
        <div className="space-y-4">
          {candidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold">{candidate.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{candidate.score}%</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-2">{candidate.email}</p>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {candidate.location}
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="h-3 w-3 mr-1" />
                          {candidate.education}
                        </div>
                        <div>{candidate.experience} experience</div>
                        <Badge className={getStatusColor(candidate.status)}>{candidate.status}</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.slice(0, 4).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.skills.length - 4} more
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Applied to: {candidate.appliedJobs.join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Note
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm">Shortlist</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
