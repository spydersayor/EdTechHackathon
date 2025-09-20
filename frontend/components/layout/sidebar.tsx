"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Brain,
  LayoutDashboard,
  Upload,
  FileText,
  Briefcase,
  User,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  UserCheck,
  FolderOpen,
} from "lucide-react"
import { getCurrentUser, logout } from "@/lib/auth"

interface SidebarProps {
  userRole: "student" | "placement"
}

export function Sidebar({ userRole }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const user = getCurrentUser()

  const studentNavItems = [
    { href: "/student", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/student/jobs", icon: Briefcase, label: "Browse Jobs" },
    { href: "/student/upload", icon: Upload, label: "Upload Resume" },
    { href: "/student/resume-manager", icon: FolderOpen, label: "Resume Manager" },
    { href: "/student/results", icon: FileText, label: "Results" },
    { href: "/student/applications", icon: Briefcase, label: "Applications" },
    { href: "/student/profile", icon: User, label: "Profile" },
  ]

  const placementNavItems = [
    { href: "/placement", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/placement/jobs", icon: Briefcase, label: "Jobs" },
    { href: "/placement/candidates", icon: Users, label: "Candidates" },
    { href: "/placement/shortlist", icon: UserCheck, label: "Shortlist" },
    { href: "/placement/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/placement/settings", icon: Settings, label: "Settings" },
  ]

  const navItems = userRole === "student" ? studentNavItems : placementNavItems

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-sidebar-primary mr-2" />
            <div className="flex flex-col">
              <span className="font-bold text-sidebar-foreground text-sm">CampusHire</span>
              <span className="text-xs text-sidebar-foreground/70">by Innomatics Research Labs</span>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed ? "px-2" : "px-3",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className={cn("h-4 w-4", collapsed ? "" : "mr-2")} />
                {!collapsed && item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && user && (
          <div className="flex items-center mb-3">
            <Avatar className="h-8 w-8 mr-3">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/80 truncate">{user.email}</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            collapsed ? "px-2" : "justify-start",
          )}
        >
          <LogOut className={cn("h-4 w-4", collapsed ? "" : "mr-2")} />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  )
}
