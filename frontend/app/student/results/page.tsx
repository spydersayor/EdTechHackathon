import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { FileText, Download, Share2, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

export default function ResultsPage() {
  const resumeScore = 87
  const skills = [
    { name: "React", level: 90, category: "Frontend" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Python", level: 80, category: "Programming" },
    { name: "Machine Learning", level: 75, category: "AI/ML" },
    { name: "Communication", level: 88, category: "Soft Skills" },
    { name: "Leadership", level: 70, category: "Soft Skills" },
  ]

  const suggestions = [
    {
      type: "improvement",
      title: "Add Cloud Computing Skills",
      description: "Consider learning AWS or Azure to increase your marketability for DevOps roles.",
      priority: "high",
    },
    {
      type: "strength",
      title: "Strong Frontend Skills",
      description: "Your React and JavaScript skills are excellent for frontend developer positions.",
      priority: "info",
    },
    {
      type: "improvement",
      title: "Include More Projects",
      description: "Add 2-3 more projects to demonstrate practical application of your skills.",
      priority: "medium",
    },
  ]

  return (
    <DashboardLayout userRole="student">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Resume Analysis Results</h1>
            <p className="text-muted-foreground">AI-powered insights and recommendations for your resume</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overall Score */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-6 w-6 mr-2" />
              Overall Resume Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold text-green-600">{resumeScore}%</div>
              <div className="flex-1">
                <Progress value={resumeScore} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  Your resume scores higher than 78% of candidates in your field
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Skills Analysis</CardTitle>
            <CardDescription>Breakdown of your technical and soft skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{skill.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {skill.category}
                      </Badge>
                      <span className="text-sm font-medium">{skill.level}%</span>
                    </div>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              AI Recommendations
            </CardTitle>
            <CardDescription>Personalized suggestions to improve your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                  {suggestion.type === "improvement" ? (
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <Badge
                        variant={
                          suggestion.priority === "high"
                            ? "destructive"
                            : suggestion.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Job Match Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Top Job Matches</CardTitle>
            <CardDescription>Positions that best match your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { company: "TechCorp", position: "Frontend Developer", match: 94 },
                { company: "DataFlow", position: "Full Stack Developer", match: 89 },
                { company: "AI Solutions", position: "React Developer", match: 87 },
              ].map((job, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{job.position}</h4>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{job.match}%</div>
                    <div className="text-xs text-muted-foreground">Match</div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4">View All Matches</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
