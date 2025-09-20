"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ResumeAnalyzer } from "@/components/resume/resume-analyzer"
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [error, setError] = useState("")

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB")
        return
      }
      if (
        !["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(
          selectedFile.type,
        )
      ) {
        setError("Only PDF and DOCX files are supported")
        return
      }
      setFile(selectedFile)
      setError("")
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setUploading(false)
    setUploadComplete(true)
    setShowAnalysis(true)
  }

  const resetUpload = () => {
    setFile(null)
    setUploading(false)
    setUploadComplete(false)
    setShowAnalysis(false)
    setError("")
  }

  const handleAnalysisComplete = (analysis: any) => {
    console.log("Analysis complete:", analysis)
  }

  return (
    <DashboardLayout userRole="student">
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Resume Upload & Analysis</h1>
          <p className="text-muted-foreground">
            Upload your resume for comprehensive AI-powered analysis and job matching
          </p>
        </div>

        {!showAnalysis ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle>Resume Upload</CardTitle>
                <CardDescription>Upload your resume in PDF or DOCX format (max 10MB)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!uploadComplete ? (
                  <>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Drag and drop your resume here, or click to browse
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.docx"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="resume-upload"
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById("resume-upload")?.click()}
                          disabled={uploading}
                        >
                          Choose File
                        </Button>
                      </div>
                    </div>

                    {file && (
                      <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        {!uploading && (
                          <Button variant="ghost" size="sm" onClick={resetUpload}>
                            Remove
                          </Button>
                        )}
                      </div>
                    )}

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button onClick={handleUpload} disabled={!file || uploading} className="w-full">
                      {uploading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        "Upload & Analyze"
                      )}
                    </Button>
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold">Upload Complete!</h3>
                      <p className="text-muted-foreground">Starting AI analysis...</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analysis Preview */}
            <Card>
              <CardHeader>
                <CardTitle>AI Analysis Features</CardTitle>
                <CardDescription>Our advanced AI will analyze multiple aspects of your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Skills Extraction & Matching</h4>
                      <p className="text-sm text-muted-foreground">
                        Identify technical and soft skills, compare with job requirements
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Experience Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Evaluate work experience, projects, and career progression
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Education & Qualifications</h4>
                      <p className="text-sm text-muted-foreground">Match education background with job requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Format & Structure Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Evaluate resume formatting, readability, and ATS compatibility
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Job Compatibility Scoring</h4>
                      <p className="text-sm text-muted-foreground">
                        Calculate compatibility scores with available positions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Personalized Recommendations</h4>
                      <p className="text-sm text-muted-foreground">
                        Get AI-powered suggestions to enhance your profile
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            {file && <ResumeAnalyzer resumeFile={file} onAnalysisComplete={handleAnalysisComplete} />}
            <div className="mt-6 text-center">
              <Button variant="outline" onClick={resetUpload}>
                Upload Another Resume
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
