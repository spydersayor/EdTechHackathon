"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, MapPin, Calendar, DollarSign, Search, Filter, Star, Bookmark, Send } from "lucide-react"

const jobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Bangalore",
    type: "Full-time",
    salary: "₹15-25 LPA",
    posted: "2024-01-15",
    logo: "/placeholder.svg?height=40&width=40&text=TC",
    skills: ["React", "TypeScript", "Node.js"],
    matchScore: 94,
    isBookmarked: false,
    hasApplied: false,
  },
  {
    id: "2",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    location: "Mumbai",
    type: "Full-time",
    salary: "₹12-20 LPA",
    posted: "2024-01-12",
    logo: "/placeholder.svg?height=40&width=40&text=SX",
    skills: ["Python", "Django", "React"],
    matchScore: 89,
    isBookmarked: true,
    hasApplied: false,
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "DataFlow Inc",
    location: "Hyderabad",
    type: "Full-time",
    salary: "₹18-28 LPA",
    posted: "2024-01-10",
    logo: "/placeholder.svg?height=40&width=40&text=DF",
    skills: ["Python", "ML", "TensorFlow"],
    matchScore: 87,
    isBookmarked: false,
    hasApplied: true,
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Pune",
    type: "Full-time",
    salary: "₹16-24 LPA",
    posted: "2024-01-08",
    logo: "/placeholder.svg?height=40&width=40&text=CT",
    skills: ["AWS", "Docker", "Kubernetes"],
    matchScore: 82,
    isBookmarked: false,
    hasApplied: false,
  },
  {
    id: "5",
    title: "UI/UX Designer",
    company: "DesignStudio",
    location: "Chennai",
    type: "Full-time",
    salary: "₹10-16 LPA",
    posted: "2024-01-05",
    logo: "/placeholder.svg?height=40&width=40&text=DS",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    matchScore: 78,
    isBookmarked: false,
    hasApplied: false,
  },
]

export default function StudentJobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [jobList, setJobList] = useState(jobs)

  const handleBookmark = (jobId: string) => {
    setJobList(jobList.map((job) => (job.id === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job)))
  }

  const handleApply = (jobId: string) => {
    setJobList(jobList.map((job) => (job.id === jobId ? { ...job, hasApplied: true } : job)))
  }

  const filteredJobs = jobList.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !locationFilter || locationFilter === "all" || job.location === locationFilter
    const matchesType = !typeFilter || typeFilter === "all" || job.type === typeFilter
    return matchesSearch && matchesLocation && matchesType
  })

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-yellow-600"
    return "text-orange-600"
  }

  const getMatchBadge = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800"
    if (score >= 80) return "bg-yellow-100 text-yellow-800"
    return "bg-orange-100 text-orange-800"
  }

  return (
    <DashboardLayout userRole="student">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Job Opportunities</h1>
            <p className="text-muted-foreground">Discover jobs that match your skills and interests</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Best Match</div>
            <div className="text-2xl font-bold text-green-600">94%</div>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs or companies..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Job Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{filteredJobs.length} jobs found</p>
            <Select defaultValue="match">
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Best Match</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="salary">Highest Salary</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className={`text-sm font-medium ${getMatchColor(job.matchScore)}`}>
                            {job.matchScore}%
                          </span>
                        </div>
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
                          <DollarSign className="h-3 w-3 mr-1" />
                          {job.salary}
                        </div>
                        <Badge variant="secondary">{job.type}</Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
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
                        <Badge className={getMatchBadge(job.matchScore)}>
                          {job.matchScore >= 90 ? "Excellent" : job.matchScore >= 80 ? "Good" : "Fair"} Match
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBookmark(job.id)}
                      className={job.isBookmarked ? "text-primary" : ""}
                    >
                      <Bookmark className={`h-4 w-4 ${job.isBookmarked ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleApply(job.id)}
                      disabled={job.hasApplied}
                      className={job.hasApplied ? "bg-green-600" : ""}
                    >
                      <Send className="h-4 w-4 mr-1" />
                      {job.hasApplied ? "Applied" : "Apply"}
                    </Button>
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
