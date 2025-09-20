"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "./sidebar"
import { NotificationSystem } from "@/components/ui/notification-system"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { getCurrentUser, type Student, type PlacementUser } from "@/lib/auth"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "student" | "placement"
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const [user, setUser] = useState<Student | PlacementUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      router.push("/")
      return
    }
    if (currentUser.role !== userRole) {
      router.push(currentUser.role === "student" ? "/student" : "/placement")
      return
    }
    setUser(currentUser)
    setIsLoading(false)
  }, [userRole, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={userRole} />
      <div className="flex-1 flex flex-col">
        <header className="bg-sidebar border-b border-sidebar-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-sidebar-foreground">
                AI-Screen Pro: Intelligent Hiring Dashboard
              </h1>
              <p className="text-sidebar-foreground/70 text-sm">Welcome back, {user.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <NotificationSystem />
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">{user.name.charAt(0)}</span>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-background">{children}</main>
      </div>
    </div>
  )
}
