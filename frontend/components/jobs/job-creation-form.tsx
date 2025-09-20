"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Plus, X, Building2, DollarSign, Clock } from "lucide-react"

export function JobCreationForm() {
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [mustHaveSkills, setMustHaveSkills] = useState<string[]>([])
  const [newMustHaveSkill, setNewMustHaveSkill] = useState("")
  const [benefits, setBenefits] = useState<string[]>([])
  const [newBenefit, setNewBenefit] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const addMustHaveSkill = () => {
    if (newMustHaveSkill.trim() && !mustHaveSkills.includes(newMustHaveSkill.trim())) {
      setMustHaveSkills([...mustHaveSkills, newMustHaveSkill.trim()])
      setNewMustHaveSkill("")
    }
  }

  const removeMustHaveSkill = (skillToRemove: string) => {
    setMustHaveSkills(mustHaveSkills.filter((skill) => skill !== skillToRemove))
  }

  const addBenefit = () => {
    if (newBenefit.trim() && !benefits.includes(newBenefit.trim())) {
      setBenefits([...benefits, newBenefit.trim()])
      setNewBenefit("")
    }
  }

  const removeBenefit = (benefitToRemove: string) => {
    setBenefits(benefits.filter((benefit) => benefit !== benefitToRemove))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Job</h1>
        <p className="text-muted-foreground">Post a new job opening and start receiving applications</p>
      </div>

      <form className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Basic Information
            </CardTitle>
            <CardDescription>Essential details about the job position</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input id="jobTitle" placeholder="e.g. Senior Frontend Developer" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input id="location" placeholder="e.g. Bangalore, India" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobType">Job Type *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0-1 years)</SelectItem>
                    <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                    <SelectItem value="lead">Lead (8+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="positions">Number of Positions</Label>
                <Input id="positions" type="number" placeholder="1" min="1" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compensation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Compensation & Benefits
            </CardTitle>
            <CardDescription>Salary range and additional benefits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minSalary">Minimum Salary (₹)</Label>
                <Input id="minSalary" type="number" placeholder="500000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxSalary">Maximum Salary (₹)</Label>
                <Input id="maxSalary" type="number" placeholder="1200000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select defaultValue="inr">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inr">INR (₹)</SelectItem>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Benefits & Perks</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {benefits.map((benefit) => (
                  <Badge key={benefit} variant="secondary" className="flex items-center gap-1">
                    {benefit}
                    <button
                      type="button"
                      onClick={() => removeBenefit(benefit)}
                      className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a benefit..."
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                />
                <Button type="button" onClick={addBenefit} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
            <CardDescription>Detailed description of the role and responsibilities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="summary">Job Summary *</Label>
              <Textarea id="summary" placeholder="Brief overview of the role..." className="min-h-[100px]" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsibilities">Key Responsibilities *</Label>
              <Textarea
                id="responsibilities"
                placeholder="• Develop and maintain web applications&#10;• Collaborate with cross-functional teams&#10;• Write clean, maintainable code"
                className="min-h-[120px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualifications">Qualifications</Label>
              <Textarea
                id="qualifications"
                placeholder="• Bachelor's degree in Computer Science or related field&#10;• 3+ years of experience in web development&#10;• Strong problem-solving skills"
                className="min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Skills & Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Skills & Requirements</CardTitle>
            <CardDescription>Technical and soft skills required for this position</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Must-Have Skills */}
            <div className="space-y-2">
              <Label>Must-Have Skills *</Label>
              <p className="text-sm text-muted-foreground">Essential skills that candidates must possess</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {mustHaveSkills.map((skill) => (
                  <Badge key={skill} variant="destructive" className="flex items-center gap-1">
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeMustHaveSkill(skill)}
                      className="ml-1 hover:bg-destructive-foreground hover:text-destructive rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Add a must-have skill..."
                  value={newMustHaveSkill}
                  onChange={(e) => setNewMustHaveSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addMustHaveSkill())}
                />
                <Button type="button" onClick={addMustHaveSkill} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Good-to-Have Skills */}
            <div className="space-y-2">
              <Label>Good-to-Have Skills</Label>
              <p className="text-sm text-muted-foreground">Additional skills that would be beneficial</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <button
                      type="button"
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
                  placeholder="Add a good-to-have skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Application Settings
            </CardTitle>
            <CardDescription>Configure how applications are handled</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="applicationDeadline">Application Deadline</Label>
                <Input id="applicationDeadline" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Expected Start Date</Label>
                <Input id="startDate" type="date" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoScreening">Enable AI Auto-Screening</Label>
                  <p className="text-sm text-muted-foreground">Automatically screen applications using AI</p>
                </div>
                <Switch id="autoScreening" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified when candidates apply</p>
                </div>
                <Switch id="emailNotifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="publicListing">Public Job Listing</Label>
                  <p className="text-sm text-muted-foreground">Make this job visible to all candidates</p>
                </div>
                <Switch id="publicListing" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button">
            Save as Draft
          </Button>
          <Button type="submit">Publish Job</Button>
        </div>
      </form>
    </div>
  )
}
