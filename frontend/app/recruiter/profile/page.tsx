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
import { User, Building, Plus, X, Users } from "lucide-react"
import { getCurrentUser, type Recruiter } from "@/lib/auth"

export default function RecruiterProfilePage() {
  const [user, setUser] = useState<Recruiter | null>(null)
  const [specializations, setSpecializations] = useState<string[]>([])
  const [newSpecialization, setNewSpecialization] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser && currentUser.role === "recruiter") {
      setUser(currentUser as Recruiter)
      setSpecializations(currentUser.specializations || ["Software Engineering", "Data Science", "Product Management"])
    }
  }, [])

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

  const addSpecialization = () => {
    if (newSpecialization.trim() && !specializations.includes(newSpecialization.trim())) {
      setSpecializations([...specializations, newSpecialization.trim()])
      setNewSpecialization("")
    }
  }

  const removeSpecialization = (specToRemove: string) => {
    setSpecializations(specializations.filter((spec) => spec !== specToRemove))
  }

  if (!user) {
    return (
      <DashboardLayout userRole="recruiter">
        <div className="p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-foreground">Loading profile...</h2>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="recruiter">
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Recruiter Profile</h1>
          <p className="text-muted-foreground">Manage your professional information and hiring preferences</p>
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

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Building className="h-5 w-5 mr-2" />
              Company Information
            </CardTitle>
            <CardDescription>Your organization details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-foreground">
                  Company Name
                </Label>
                <Input id="company" defaultValue={user.company} className="text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position" className="text-foreground">
                  Your Position
                </Label>
                <Input id="position" defaultValue="Senior Talent Acquisition Manager" className="text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department" className="text-foreground">
                  Department
                </Label>
                <Input id="department" defaultValue="Human Resources" className="text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companySize" className="text-foreground">
                  Company Size
                </Label>
                <Input id="companySize" defaultValue="1000-5000 employees" className="text-foreground" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-foreground">
                  Industry
                </Label>
                <Input id="industry" defaultValue="Technology" className="text-foreground" />
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

        {/* Hiring Specializations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-foreground">
              <Users className="h-5 w-5 mr-2" />
              Hiring Specializations
            </CardTitle>
            <CardDescription>Areas you specialize in recruiting for</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {specializations.map((spec) => (
                <Badge key={spec} variant="secondary" className="flex items-center gap-1">
                  {spec}
                  <button
                    onClick={() => removeSpecialization(spec)}
                    className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="Add a specialization..."
                value={newSpecialization}
                onChange={(e) => setNewSpecialization(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addSpecialization()}
                className="text-foreground"
              />
              <Button onClick={addSpecialization} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Professional Bio */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Professional Bio</CardTitle>
            <CardDescription>Tell candidates about your recruiting philosophy and experience</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Describe your recruiting experience, company culture, and what you look for in candidates..."
              className="min-h-[120px] text-foreground"
              defaultValue="Experienced talent acquisition professional with 8+ years in tech recruiting. I specialize in identifying top-tier engineering and product talent for fast-growing startups and established tech companies. I believe in building genuine relationships with candidates and providing transparent, respectful hiring experiences."
            />
          </CardContent>
        </Card>

        {/* Contact Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Contact Preferences</CardTitle>
            <CardDescription>How candidates can reach you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-foreground">
                LinkedIn
              </Label>
              <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" className="text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calendly" className="text-foreground">
                Calendly/Scheduling Link
              </Label>
              <Input id="calendly" placeholder="https://calendly.com/yourname" className="text-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workEmail" className="text-foreground">
                Work Email
              </Label>
              <Input id="workEmail" type="email" defaultValue={user.email} className="text-foreground" />
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
