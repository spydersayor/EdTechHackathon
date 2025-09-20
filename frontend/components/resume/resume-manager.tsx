"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { FileText, Download, Eye, Edit, Trash2, Plus, Calendar, Star } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockResumes = [
  {
    id: "1",
    name: "Software_Engineer_Resume_v3.pdf",
    uploadDate: "2024-01-15",
    score: 87,
    status: "Active",
    jobsApplied: 12,
    views: 45,
    size: "2.3 MB",
    type: "pdf",
  },
  {
    id: "2",
    name: "Frontend_Developer_Resume.pdf",
    uploadDate: "2024-01-10",
    score: 82,
    status: "Draft",
    jobsApplied: 0,
    views: 8,
    size: "1.8 MB",
    type: "pdf",
  },
  {
    id: "3",
    name: "Data_Scientist_Resume.docx",
    uploadDate: "2024-01-05",
    score: 79,
    status: "Archived",
    jobsApplied: 8,
    views: 23,
    size: "1.2 MB",
    type: "docx",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "Draft":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "Archived":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export function ResumeManager() {
  const [resumes, setResumes] = useState(mockResumes)

  const handleDelete = (id: string) => {
    setResumes(resumes.filter((resume) => resume.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Resume Manager</h2>
          <p className="text-muted-foreground">Manage your resume versions and track their performance</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Upload New Resume
        </Button>
      </div>

      {/* Resume Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{resumes.length}</p>
                <p className="text-xs text-muted-foreground">Total Resumes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-xs text-muted-foreground">Best Score</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">76</p>
                <p className="text-xs text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">20</p>
                <p className="text-xs text-muted-foreground">Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resume List */}
      <div className="space-y-4">
        {resumes.map((resume) => (
          <Card key={resume.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      <FileText className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium">{resume.name}</h3>
                      <Badge className={getStatusColor(resume.status)}>{resume.status}</Badge>
                      {resume.score >= 85 && <Star className="h-4 w-4 text-yellow-500" />}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <span>Uploaded {new Date(resume.uploadDate).toLocaleDateString()}</span>
                      <span>{resume.size}</span>
                      <span className="uppercase">{resume.type}</span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="font-medium">{resume.score}% Score</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3 text-muted-foreground" />
                        <span>{resume.views} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FileText className="h-3 w-3 text-muted-foreground" />
                        <span>{resume.jobsApplied} applications</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem>Set as Primary</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(resume.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips Card */}
      <Card>
        <CardHeader>
          <CardTitle>Resume Tips</CardTitle>
          <CardDescription>Best practices for creating effective resumes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-green-600">Do's</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Use action verbs and quantify achievements
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Tailor your resume for each job application
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Keep it concise and well-formatted
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Include relevant keywords from job descriptions
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-red-600">Don'ts</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  Don't include irrelevant personal information
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  Avoid spelling and grammatical errors
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  Don't use generic objective statements
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  Avoid outdated or unprofessional email addresses
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
