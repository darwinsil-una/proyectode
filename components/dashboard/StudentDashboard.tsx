"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Calendar, Users, Brain } from "lucide-react"
import Header from "@/components/shared/Header"
import GradePrediction from "@/components/features/grades/GradePrediction"
import AcademicPlanner from "@/components/features/planner/AcademicPlanner"
import CollaborativeNetwork from "@/components/collaborative-network"
import AIAssistant from "@/components/features/ai/AIAssistant"
import UserProfile from "@/components/features/profile/UserProfile"
import type { Student } from "@/types"

interface StudentDashboardProps {
  user: Student
  onLogout: () => void
}

export default function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState("grades")
  const [showProfile, setShowProfile] = useState(false)

  if (showProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          user={user}
          onProfileClick={() => setShowProfile(false)}
          onLogout={onLogout}
          title="Mi Perfil"
          subtitle="Información personal y académica"
        />
        <div className="p-6">
          <UserProfile user={user} onBack={() => setShowProfile(false)} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onProfileClick={() => setShowProfile(true)}
        onLogout={onLogout}
        title="Dashboard Estudiantil"
        subtitle="Tu centro de control académico"
      />

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="grades" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Calificaciones
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Planificador
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Red Colaborativa
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Asistente IA
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grades" className="mt-6">
            <GradePrediction />
          </TabsContent>

          <TabsContent value="planner" className="mt-6">
            <AcademicPlanner />
          </TabsContent>

          <TabsContent value="network" className="mt-6">
            <CollaborativeNetwork />
          </TabsContent>

          <TabsContent value="ai" className="mt-6">
            <AIAssistant />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
