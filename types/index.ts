// Core Types
export interface User {
  id: number
  name: string
  email: string
  userType: "student" | "admin"
  avatar?: string
  isAuthenticated: boolean
}



export interface Student extends User {
  university: string
  career: string
  semester: string
  subjects: string[]
  isOnline: boolean
  lastSeen: string
  bio: string
  connections: number
  studyGroups: number[]
  rating: number
  badges: string[]
}

// Academic Types
export interface Task {
  id: number
  title: string
  subject: string
  dueDate: string
  priority: "high" | "medium" | "low"
  status: "pending" | "in-progress" | "completed"
  estimatedHours: number
  description: string
  reminder?: boolean
  reminderTime?: string
  createdAt: string
  completedAt?: string
}

export interface Subject {
  id: string
  name: string
  currentGrade: number
  predictedFinal: number
  trend: "up" | "down"
  risk: "low" | "medium" | "high"
  confidence: number
  nextExam: string
  recommendations: string[]
  progress: {
    assignments: number
    participation: number
    exams: number
  }
}

// Collaboration Types
export interface StudyGroup {
  id: number
  name: string
  subject: string
  description: string
  members: number
  maxMembers: number
  nextMeeting: string
  location: string
  rating: number
  tags: string[]
  isPrivate: boolean
  createdBy: string
  createdAt: string
}

export interface ForumTopic {
  id: number
  title: string
  content: string
  author: string
  authorAvatar: string
  subject: string
  replies: Reply[]
  views: number
  likes: number
  isHot: boolean
  isPinned: boolean
  lastActivity: string
  createdAt: string
  tags: string[]
}

export interface Reply {
  id: number
  content: string
  author: string
  authorAvatar: string
  createdAt: string
}

// Messaging Types
export interface Message {
  id: number
  content: string
  senderId: number
  senderName: string
  senderAvatar: string
  timestamp: string
  type: "text" | "image" | "file" | "audio" | "video"
  status: "sending" | "sent" | "delivered" | "read"
}

export interface Conversation {
  id: number
  participantId: number
  participantName: string
  participantAvatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  isTyping: boolean
  messages: Message[]
}

// Notification Types
export interface Notification {
  id: number
  type: "message" | "group_invite" | "meeting" | "resource" | "mention" | "like" | "reply"
  title: string
  content: string
  timestamp: string
  read: boolean
  actionUrl?: string
  senderId?: number
  senderName?: string
  senderAvatar?: string
}

// AI Types
export interface AIMessage {
  id: string
  role: "user" | "assistant"
  content: string
}

export interface AIFeature {
  id: string
  title: string
  description: string
  icon: any
  color: string
  prompt: string
}

// Form Types
export interface RegisterFormData {
  fullName: string
  institution: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  studentId: string
  academicProgram: string
  yearCourse: string
  university: string
  userType: "student" | "admin"
  academicInterests: string[]
  preferredLanguage: string
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
}

export interface LoginFormData {
  email: string
  password: string
  userType: "student" | "admin"
}
