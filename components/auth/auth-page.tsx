"use client"

import { useState } from "react"
import SimpleLogin from "./simple-login"
import RegisterFormSimple from "./register-form-simple"

interface AuthPageProps {
  onAuthenticated: (userData: any) => void
}

export default function AuthPage({ onAuthenticated }: AuthPageProps) {
  const [currentView, setCurrentView] = useState<"login" | "register">("login")

  const handleLogin = (userData: any) => {
    onAuthenticated(userData)
  }

  const handleRegister = (userData: any) => {
    onAuthenticated(userData)
  }

  const switchToRegister = () => {
    setCurrentView("register")
  }

  const switchToLogin = () => {
    setCurrentView("login")
  }

  if (currentView === "register") {
    return <RegisterFormSimple onRegister={handleRegister} onSwitchToLogin={switchToLogin} />
  }

  return <SimpleLogin onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
}
