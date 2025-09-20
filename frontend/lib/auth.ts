export interface User {
  id: string
  name: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: "student" | "placement"
  avatar?: string
}

export interface Student extends User {
  role: "student"
  degree: string
  branch: string
  gradYear: number
  location: string
  skills: string[]
  resumeUrl?: string
}

export interface PlacementUser extends User {
  role: "placement"
  organization: string
  orgRole: string
}

// Mock authentication - in real app this would connect to backend
export const mockUsers: (Student | PlacementUser)[] = [
  {
    id: "1",
    name: "Alex Johnson",
    firstName: "Alex",
    lastName: "Johnson",
    email: "student@example.com",
    phone: "+91 9876543210",
    role: "student",
    degree: "B.Tech",
    branch: "Computer Science",
    gradYear: 2024,
    location: "Bangalore",
    skills: ["React", "Node.js", "Python", "Machine Learning"],
    avatar: "/diverse-students-studying.png",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    firstName: "Sarah",
    lastName: "Wilson",
    email: "recruiter@example.com",
    phone: "+91 9876543211",
    role: "placement",
    organization: "TechCorp",
    orgRole: "Senior Recruiter",
    avatar: "/recruiter-meeting.png",
  },
]

export const getCurrentUser = (): Student | PlacementUser | null => {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("currentUser")
  return userStr ? JSON.parse(userStr) : null
}

export const login = (email: string, password: string): Student | PlacementUser | null => {
  const user = mockUsers.find((u) => u.email === email)
  if (user && password === "123456") {
    localStorage.setItem("currentUser", JSON.stringify(user))
    return user
  }
  return null
}

export const signup = (userData: {
  name: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  role: "student" | "placement"
  degree?: string
  branch?: string
  gradYear?: number
  location?: string
  organization?: string
  orgRole?: string
}): Student | PlacementUser | null => {
  // Check if user already exists
  const existingUser = mockUsers.find((u) => u.email === userData.email)
  if (existingUser) {
    return null // User already exists
  }

  const newUser: Student | PlacementUser = {
    id: (mockUsers.length + 1).toString(),
    name: userData.name,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    role: userData.role,
    ...(userData.role === "student"
      ? {
          degree: userData.degree || "B.Tech",
          branch: userData.branch || "Computer Science",
          gradYear: userData.gradYear || 2024,
          location: userData.location || "Bangalore",
          skills: [],
        }
      : {
          organization: userData.organization || "Company",
          orgRole: userData.orgRole || "Recruiter",
        }),
  }

  mockUsers.push(newUser)
  localStorage.setItem("currentUser", JSON.stringify(newUser))
  return newUser
}

export const logout = () => {
  localStorage.removeItem("currentUser")
}
