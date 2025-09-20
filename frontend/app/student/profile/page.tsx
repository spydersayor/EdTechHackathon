"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, GraduationCap, Plus, X } from "lucide-react"
import { getCurrentUser, type Student } from "@/lib/auth"

export default function ProfilePage() {
  const [user, setUser] = useState<Student | null>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.role === "student") {
      setUser(currentUser as Student)
      setSkills(currentUser.skills || ["React", "Node.js", "Python", "Machine Learning"])
      setProfilePhoto(currentUser.avatar || null)
    }
  }, [])

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfilePhoto(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  if (!user) {
    return (
      <DashboardLayout userRole="student">
        <div className="p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground">Loading profile...</h2>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="student">
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your personal information and preferences</p>
        </div>

        {/* Profile Picture & Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Personal Information</CardTitle>
            <CardDescription>Update your basic profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profilePhoto || user.avatar || "/placeholder.svg?height=96&width=96"} />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button variant="outline" onClick={triggerFileInput}>
                  Change Photo
                </Button>
                <p className="text-sm text-muted-foreground mt-2">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground">
                  First Name
                </Label>
                <Input id="firstName" defaultValue={user.firstName} className="text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-foreground">
                  Last Name
                </Label>
                <Input id="lastName" defaultValue={user.lastName} className="text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input id="email" type="email" defaultValue={user.email} className="text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  Phone
                </Label>
                <Input id="phone" defaultValue={user.phone} className="text-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <GraduationCap className="h-5 w-5 mr-2" />
              Education
            </CardTitle>
            <CardDescription>Your educational background</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degree" className="text-foreground">
                  Degree
                </Label>
                <Input id="degree" defaultValue={user.degree} className="text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="branch" className="text-foreground">
                  Branch/Major
                </Label>
                <Input id="branch" defaultValue={user.branch} className="text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="university" className="text-foreground">
                  University/College
                </Label>
                <Input id="university" defaultValue="Indian Institute of Technology" className="text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gradYear" className="text-foreground">
                  Graduation Year
                </Label>
                <Input id="gradYear" type="number" defaultValue={user.gradYear} className="text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cgpa" className="text-foreground">
                  CGPA/Percentage
                </Label>
                <Input id="cgpa" defaultValue="8.5" className="text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-foreground">
                  Location
                </Label>
                <Input id="location" defaultValue={user.location} className="text-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Skills</CardTitle>
            <CardDescription>Add your technical and soft skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Add a skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
                className="text-foreground"
              />
              <Button onClick={addSkill} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">About Me</CardTitle>
            <CardDescription>Write a brief description about yourself</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Tell us about yourself, your interests, and career goals..."
              className="min-h-[120px] text-foreground"
              defaultValue="Passionate computer science student with a strong foundation in web development and machine learning. Experienced in building full-stack applications using modern technologies. Looking for opportunities to apply my skills in a dynamic tech environment."
            />
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Social Links</CardTitle>
            <CardDescription>Add your professional social media profiles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-foreground">
                LinkedIn
              </Label>
              <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" className="text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github" className="text-foreground">
                GitHub
              </Label>
              <Input id="github" placeholder="https://github.com/yourusername" className="text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio" className="text-foreground">
                Portfolio Website
              </Label>
              <Input id="portfolio" placeholder="https://yourportfolio.com" className="text-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button size="lg">Save Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
