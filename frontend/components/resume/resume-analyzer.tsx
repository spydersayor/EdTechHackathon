"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FileText, Brain, CheckCircle, AlertTriangle, TrendingUp, Download } from "lucide-react"

interface ResumeAnalysisProps {
  resumeFile: File
  onAnalysisComplete: (analysis: any) => void
}

export function ResumeAnalyzer({ resumeFile, onAnalysisComplete }: ResumeAnalysisProps) {
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(true)

  useEffect(() => {
    simulateAnalysis()
  }, [])

  const simulateAnalysis = async () => {
    const phases = [
      { name: "Parsing document structure", duration: 1000 },
      { name: "Extracting text content", duration: 1500 },
      { name: "Identifying skills and keywords", duration: 2000 },
      { name: "Analyzing experience sections", duration: 1800 },
      { name: "Evaluating education background", duration: 1200 },
      { name: "Generating AI insights", duration: 2500 },
      { name: "Calculating compatibility scores", duration: 1000 },
    ]

    for (let i = 0; i < phases.length; i++) {
      setCurrentPhase(phases[i].name)
      setProgress(((i + 1) / phases.length) * 100)
      await new Promise((resolve) => setTimeout(resolve, phases[i].duration))
    }

    // Generate mock analysis results
    const mockAnalysis = {
      overallScore: 87,
      sections: {
        skills: {
          score: 92,
          extracted: ["React", "Node.js", "Python", "Machine Learning", "AWS", "Docker"],
          missing: ["Kubernetes", "GraphQL", "TypeScript"],
        },
        experience: {
          score: 85,
          years: 2.5,
          relevantProjects: 4,
          leadership: true,
        },
        education: {
          score: 90,
          degree: "B.Tech Computer Science",
          institution: "IIT Delhi",
          cgpa: 8.5,
        },
        formatting: {
          score: 78,
          issues: ["Inconsistent font sizes", "Missing contact information"],
          strengths: ["Clear section headers", "Good use of bullet points"],
        },
      },
      suggestions: [
        {
          type: "critical",
          title: "Add missing technical skills",
          description: "Include Kubernetes and GraphQL to match current job requirements",
        },
        {
          type: "improvement",
          title: "Quantify achievements",
          description: "Add specific metrics and numbers to demonstrate impact",
        },
        {
          type: "formatting",
          title: "Improve visual consistency",
          description: "Use consistent font sizes and spacing throughout",
        },
      ],
      jobMatches: [
        { title: "Frontend Developer", company: "TechCorp", match: 94 },
        { title: "Full Stack Developer", company: "StartupXYZ", match: 89 },
        { title: "Software Engineer", company: "BigTech", match: 86 },
      ],
    }

    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)
    onAnalysisComplete(mockAnalysis)
  }

  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 animate-pulse" />
            AI Analysis in Progress
          </CardTitle>
          <CardDescription>Analyzing your resume with advanced AI algorithms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground">{currentPhase}...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!analysis) return null

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-6 w-6 mr-2" />
            Resume Analysis Complete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600">{analysis.overallScore}%</div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>
            <div className="flex-1">
              <Progress value={analysis.overallScore} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                Your resume scores higher than 78% of candidates in your field
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Section Analysis</CardTitle>
          <CardDescription>Detailed breakdown of each resume section</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Skills Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Technical Skills</h4>
              <Badge variant="secondary">{analysis.sections.skills.score}%</Badge>
            </div>
            <Progress value={analysis.sections.skills.score} className="h-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-green-600 mb-2">Identified Skills</p>
                <div className="flex flex-wrap gap-1">
                  {analysis.sections.skills.extracted.map((skill: string) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-orange-600 mb-2">Recommended Skills</p>
                <div className="flex flex-wrap gap-1">
                  {analysis.sections.skills.missing.map((skill: string) => (
                    <Badge key={skill} variant="outline" className="text-xs border-orange-200">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Experience Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Experience</h4>
              <Badge variant="secondary">{analysis.sections.experience.score}%</Badge>
            </div>
            <Progress value={analysis.sections.experience.score} className="h-2" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Experience</p>
                <p className="font-medium">{analysis.sections.experience.years} years</p>
              </div>
              <div>
                <p className="text-muted-foreground">Relevant Projects</p>
                <p className="font-medium">{analysis.sections.experience.relevantProjects}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Leadership</p>
                <p className="font-medium">{analysis.sections.experience.leadership ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Industry Fit</p>
                <p className="font-medium">Excellent</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Education Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Education</h4>
              <Badge variant="secondary">{analysis.sections.education.score}%</Badge>
            </div>
            <Progress value={analysis.sections.education.score} className="h-2" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Degree</p>
                <p className="font-medium">{analysis.sections.education.degree}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Institution</p>
                <p className="font-medium">{analysis.sections.education.institution}</p>
              </div>
              <div>
                <p className="text-muted-foreground">CGPA</p>
                <p className="font-medium">{analysis.sections.education.cgpa}/10</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            AI Recommendations
          </CardTitle>
          <CardDescription>Actionable insights to improve your resume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysis.suggestions.map((suggestion: any, index: number) => (
              <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                {suggestion.type === "critical" ? (
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                ) : suggestion.type === "improvement" ? (
                  <TrendingUp className="h-5 w-5 text-orange-500 mt-0.5" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <h4 className="font-medium">{suggestion.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                </div>
                <Badge
                  variant={
                    suggestion.type === "critical"
                      ? "destructive"
                      : suggestion.type === "improvement"
                        ? "default"
                        : "secondary"
                  }
                  className="text-xs"
                >
                  {suggestion.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Job Matches */}
      <Card>
        <CardHeader>
          <CardTitle>Top Job Matches</CardTitle>
          <CardDescription>Positions that best align with your profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysis.jobMatches.map((job: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">{job.match}%</div>
                  <div className="text-xs text-muted-foreground">Match</div>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4">View All Job Matches</Button>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
        <Button>Apply to Matched Jobs</Button>
      </div>
    </div>
  )
}
