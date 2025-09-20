"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Users, Bell, Shield, Zap } from "lucide-react"

export default function SettingsPage() {
  const [hardWeight, setHardWeight] = useState([60])
  const [softWeight, setSoftWeight] = useState([40])
  const [highThreshold, setHighThreshold] = useState([75])
  const [mediumThreshold, setMediumThreshold] = useState([50])

  return (
    <DashboardLayout userRole="placement">
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure your hiring platform preferences</p>
        </div>

        {/* AI Scoring Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              AI Scoring Configuration
            </CardTitle>
            <CardDescription>Adjust how the AI evaluates and scores candidates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Hard Skills Weight: {hardWeight[0]}%</Label>
                <Slider value={hardWeight} onValueChange={setHardWeight} max={100} step={5} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Weight given to exact skill matches and technical requirements
                </p>
              </div>
              <div>
                <Label className="text-sm font-medium">Soft Skills Weight: {softWeight[0]}%</Label>
                <Slider value={softWeight} onValueChange={setSoftWeight} max={100} step={5} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Weight given to semantic similarity and soft skills assessment
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Score Thresholds</h4>
              <div>
                <Label className="text-sm font-medium">High Match Threshold: {highThreshold[0]}%</Label>
                <Slider value={highThreshold} onValueChange={setHighThreshold} max={100} step={5} className="mt-2" />
              </div>
              <div>
                <Label className="text-sm font-medium">Medium Match Threshold: {mediumThreshold[0]}%</Label>
                <Slider
                  value={mediumThreshold}
                  onValueChange={setMediumThreshold}
                  max={100}
                  step={5}
                  className="mt-2"
                />
              </div>
              <div className="flex space-x-2 mt-2">
                <Badge className="bg-green-100 text-green-800">High: {highThreshold[0]}%+</Badge>
                <Badge className="bg-yellow-100 text-yellow-800">
                  Medium: {mediumThreshold[0]}-{highThreshold[0] - 1}%
                </Badge>
                <Badge className="bg-red-100 text-red-800">Low: &lt;{mediumThreshold[0]}%</Badge>
              </div>
            </div>

            <Button>Save Scoring Settings</Button>
          </CardContent>
        </Card>

        {/* Team Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Team Management
            </CardTitle>
            <CardDescription>Manage team members and their permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Sarah Wilson</h4>
                  <p className="text-sm text-muted-foreground">sarah.wilson@company.com</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge>Admin</Badge>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">John Doe</h4>
                  <p className="text-sm text-muted-foreground">john.doe@company.com</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Reviewer</Badge>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </div>
            <Button variant="outline">Invite Team Member</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
            <CardDescription>Configure when and how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="new-applications">New Applications</Label>
                <p className="text-sm text-muted-foreground">Get notified when candidates apply</p>
              </div>
              <Switch id="new-applications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="high-scores">High-Score Candidates</Label>
                <p className="text-sm text-muted-foreground">Alert for candidates scoring above 90%</p>
              </div>
              <Switch id="high-scores" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="interview-reminders">Interview Reminders</Label>
                <p className="text-sm text-muted-foreground">Reminders for scheduled interviews</p>
              </div>
              <Switch id="interview-reminders" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weekly-reports">Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">Summary of hiring metrics</p>
              </div>
              <Switch id="weekly-reports" />
            </div>
          </CardContent>
        </Card>

        {/* Organization Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Organization Settings
            </CardTitle>
            <CardDescription>Basic organization information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue="TechCorp" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input id="industry" defaultValue="Technology" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-size">Company Size</Label>
                <Input id="company-size" defaultValue="100-500 employees" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="Bangalore, India" />
              </div>
            </div>
            <Button>Save Organization Settings</Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security & Privacy
            </CardTitle>
            <CardDescription>Manage security and data privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch id="two-factor" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-retention">Automatic Data Retention</Label>
                <p className="text-sm text-muted-foreground">Auto-delete candidate data after 2 years</p>
              </div>
              <Switch id="data-retention" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="audit-logs">Audit Logs</Label>
                <p className="text-sm text-muted-foreground">Track all user actions and changes</p>
              </div>
              <Switch id="audit-logs" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
