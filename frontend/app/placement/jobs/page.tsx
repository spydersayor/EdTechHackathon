"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, MapPin, Calendar, Users, Search, Plus, Eye, Edit, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

const jobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Bangalore",
    type: "Full-time",
    status: "Active",
    applicants: 156,
    posted: "2024-01-15",
    salary: "₹15-25 LPA",
    logo: "/placeholder.svg?height=40&width=40&text=TC",
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: "2",
    title: "Data Scientist",
    company: "DataFlow Inc",
    location: "Mumbai",
    type: "Full-time",
    status: "Active",
    applicants: 89,
    posted: "2024-01-12",
    salary: "₹12-20 LPA",
    logo: "/placeholder.svg?height=40&width=40&text=DF",
    skills: ["Python", "ML", "TensorFlow"],
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Hyderabad",
    type: "Full-time",
    status: "Draft",
    applicants: 0,
    posted: "2024-01-10",
    salary: "₹18-28 LPA",
    logo: "/placeholder.svg?height=40&width=40&text=CT",
    skills: ["AWS", "Docker", "Kubernetes"],
  },
  {
    id: "4",
    title: "ML Engineer Intern",
    company: "AI Solutions",
    location: "Pune",
    type: "Internship",
    status: "Closed",
    applicants: 234,
    posted: "2024-01-08",
    salary: "₹25,000/month",
    logo: "/placeholder.svg?height=40&width=40&text=AI",
    skills: ["Python", "PyTorch", "Computer Vision"],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "Draft":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "Closed":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout userRole="placement">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Job Management</h1>
            <p className="text-muted-foreground">Create and manage job postings</p>
          </div>
          <Link href="/placement/jobs/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Job
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">All Status</Button>
                <Button variant="outline">Filter</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={job.logo || "/placeholder.svg"} />
                      <AvatarFallback>
                        <Building2 className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{job.company}</p>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(job.posted).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {job.applicants} applicants
                        </div>
                        <Badge variant="secondary">{job.type}</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {job.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{job.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm font-medium">{job.salary}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link href={`/placement/jobs/${job.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Job
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Candidates</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete Job</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
