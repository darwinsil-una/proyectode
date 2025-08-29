"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, LogOut, GraduationCap } from "lucide-react"
import type { User } from "@/types"

interface HeaderProps {
  user: User
  onProfileClick: () => void
  onLogout: () => void
  title: string
  subtitle?: string
}

export default function Header({ user, onProfileClick, onLogout, title, subtitle }: HeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-red-600 to-rose-600 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onProfileClick}
            className="flex items-center gap-2 hover:bg-gray-100"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block text-sm font-medium">{user.name}</span>
          </Button>

          <Button variant="outline" size="sm" onClick={onLogout} className="flex items-center gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            <span className="hidden md:block">Cerrar Sesión</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
