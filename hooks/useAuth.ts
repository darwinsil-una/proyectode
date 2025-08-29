"use client"

import { useState } from "react"
import type { User, LoginFormData, RegisterFormData } from "@/types"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (credentials: LoginFormData): Promise<void> => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockUser: User = {
      id: 1,
      name: credentials.userType === "admin" ? "Dr. Roberto Martínez" : "María González",
      email: credentials.email,
      userType: credentials.userType,
      avatar: credentials.userType === "admin" ? "/admin-avatar.png" : "/student-maria.png",
      isAuthenticated: true,
    }

    setUser(mockUser)
    setIsLoading(false)
  }

  const register = async (userData: RegisterFormData): Promise<void> => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const newUser: User = {
      id: Date.now(),
      name: userData.fullName,
      email: userData.email,
      userType: userData.userType,
      avatar: "/student-maria.png",
      isAuthenticated: true,
    }

    setUser(newUser)
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
  }

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user?.isAuthenticated,
  }
}
