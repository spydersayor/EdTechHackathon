import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, Calendar, MapPin, Search, Filter, Eye } from "lucide-react"

const applications = [
  {
    id: "1",
    company: "TechCorp",
    position: "Frontend Developer",
    location: "Bangalore",
    appliedDate: "2024-01-15",
    status: "Interview",
    logo: "/placeholder.svg?height=40&width=40&text=TC",
    matchScore: 92,
    salary: "₹8-12 LPA",
  },
  {
    id: "2",
    company: "DataFlow Inc",
    position: "Data Analyst",
    location: "Mumbai",
    appliedDate: "2024-01-12",
    status: "In Review",
    logo: "/placeholder.svg?height=40&width=40&text=DF",
    matchScore: 87,
    salary: "₹6-10 LPA",
  },
  {
    id: "3",
    company: "CloudTech",
    position: "DevOps Engineer",
    location: "Hyderabad",
    appliedDate: "2024-01-10",
    status: "Applied",
    logo: "/placeholder.svg?height=40&width=40&text=CT",
    matchScore: 78,
    salary: "₹10-15 LPA",
  },
  {
    id: "4",
    company: "AI Solutions",
    position: "ML Engineer",
    location: "Pune",
    appliedDate: "2024-01-08",
    status: "Offered",
    logo: "/placeholder.svg?height=40&width=40&text=AI",
    matchScore: 95,
    salary: "₹12-18 LPA",
  },
  {
    id: "5",
    company: "StartupXYZ",
    position: "Full Stack Developer",
    location: "Delhi",
    appliedDate: "2024-01-05",
    status: "Rejected",
    logo: "/placeholder.svg?height=40&width=40&text=SX",
    matchScore: 82,
    salary: "₹7-11 LPA",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Applied":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "In Review":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "Interview":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    case "Offered":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "Rejected":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export default function ApplicationsPage() {
  return (
    <DashboardLayout userRole="student">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Applications</h1>
            <p className="text-muted-foreground">Track and manage all your job applications</p>
          </div>
          <Button>Apply to New Jobs</Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search applications..." className="pl-10" />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle>All Applications ({applications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={app.logo || "/placeholder.svg"} />
                      <AvatarFallback>
                        <Building2 className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-lg">{app.position}</h4>
                      <p className="text-muted-foreground">{app.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {app.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(app.appliedDate).toLocaleDateString()}
                        </div>
                        <div>{app.salary}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{app.matchScore}%</div>
                      <div className="text-xs text-muted-foreground">Match</div>
                    </div>
                    <Badge className={getStatusColor(app.status)}>{app.status}</Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
