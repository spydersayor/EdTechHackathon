import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, GraduationCap, Calendar, Phone, Mail, Star, MessageSquare, UserCheck } from "lucide-react"

const shortlistedCandidates = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 9876543210",
    position: "Frontend Developer",
    location: "Bangalore",
    education: "IIT Delhi - B.Tech CSE",
    experience: "2 years",
    score: 96,
    status: "Interview Scheduled",
    avatar: "/placeholder.svg?height=40&width=40&text=PS",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    interviewDate: "2024-01-20",
    notes: "Strong technical skills, excellent communication",
  },
  {
    id: "2",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 9876543211",
    position: "Backend Developer",
    location: "Hyderabad",
    education: "NIT Warangal - B.Tech CSE",
    experience: "1 year",
    score: 90,
    status: "Final Round",
    avatar: "/placeholder.svg?height=40&width=40&text=VS",
    skills: ["Java", "Spring Boot", "PostgreSQL", "Redis"],
    interviewDate: "2024-01-22",
    notes: "Good problem-solving skills, needs mentoring",
  },
  {
    id: "3",
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 9876543212",
    position: "UI/UX Designer",
    location: "Chennai",
    education: "NID Ahmedabad - M.Des",
    experience: "2 years",
    score: 88,
    status: "Offer Extended",
    avatar: "/placeholder.svg?height=40&width=40&text=SR",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    interviewDate: "2024-01-18",
    notes: "Creative portfolio, great design thinking",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Interview Scheduled":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "Final Round":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    case "Offer Extended":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export default function ShortlistPage() {
  return (
    <DashboardLayout userRole="placement">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Shortlisted Candidates</h1>
            <p className="text-muted-foreground">Manage your top candidate selections</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Schedule Interviews</Button>
            <Button>Send Offers</Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Shortlisted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+3 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Interviews Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Offers Extended</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Pending response</p>
            </CardContent>
          </Card>
        </div>

        {/* Shortlisted Candidates */}
        <div className="space-y-6">
          {shortlistedCandidates.map((candidate) => (
            <Card key={candidate.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-xl font-semibold">{candidate.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-medium">{candidate.score}%</span>
                        </div>
                      </div>
                      <p className="text-lg text-muted-foreground mb-2">{candidate.position}</p>
                      <Badge className={getStatusColor(candidate.status)} className="mb-3">
                        {candidate.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Information */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        {candidate.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        {candidate.phone}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        {candidate.location}
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                        {candidate.education}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        Interview: {new Date(candidate.interviewDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Skills and Notes */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <h4 className="font-medium">Notes</h4>
                    <p className="text-sm text-muted-foreground">{candidate.notes}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Add Note
                  </Button>
                  <Button variant="outline" size="sm">
                    Schedule Interview
                  </Button>
                  <Button size="sm">
                    <UserCheck className="h-4 w-4 mr-1" />
                    Extend Offer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
