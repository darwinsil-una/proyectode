"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Users,
  Brain,
  TrendingUp,
  BookOpen,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
} from "lucide-react"
import AcademicPlanner from "@/components/academic-planner"
import CollaborativeNetwork from "@/components/collaborative-network"
import AIAssistant from "@/components/ai-assistant"
import GradePrediction from "@/components/grade-prediction"
import UserProfile from "@/components/user-profile"
import AdminDashboard from "@/components/admin-dashboard"
import AdminProfile from "@/components/admin-profile"
import AuthPage from "@/components/auth/auth-page"

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [currentView, setCurrentView] = useState<"dashboard" | "profile">("dashboard")

  const handleAuthenticated = (userData: any) => {
    setUser(userData)
    setCurrentView("dashboard")
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentView("dashboard")
  }

  const handleViewProfile = () => {
    setCurrentView("profile")
  }

  const handleBackToDashboard = () => {
    setCurrentView("dashboard")
  }

  if (!user?.isAuthenticated) {
    return <AuthPage onAuthenticated={handleAuthenticated} />
  }

  if (user.user?.type === "admin" || user.user?.type === "administrador") {
    if (currentView === "profile") {
      return <AdminProfile onBack={handleBackToDashboard} onLogout={handleLogout} />
    }
    return <AdminDashboard onLogout={handleLogout} onViewProfile={handleViewProfile} />
  }

  const studentData = {
    name: "María González",
    university: "Universidad Nacional",
    semester: "7mo Semestre",
    gpa: 8.7,
    completedTasks: 23,
    totalTasks: 30,
    upcomingDeadlines: 5,
    studyGroups: 3,
    riskAlerts: 1,
  }

  const upcomingTasks = [
    { id: 1, title: "Ensayo de Historia", subject: "Historia Contemporánea", due: "2024-01-15", priority: "high" },
    { id: 2, title: "Laboratorio de Química", subject: "Química Orgánica", due: "2024-01-17", priority: "medium" },
    { id: 3, title: "Presentación Grupal", subject: "Marketing Digital", due: "2024-01-20", priority: "high" },
  ]

  const recentActivity = [
    { id: 1, type: "forum", content: "Nueva discusión en Cálculo III", time: "2 horas" },
    { id: 2, type: "ai", content: "Claude te ayudó con el plan de estudio", time: "4 horas" },
    { id: 3, type: "grade", content: "Predicción actualizada para Física II", time: "1 día" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">KodePlatform</h1>
          <p className="text-lg text-gray-600">Tu plataforma integral para el éxito académico universitario</p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={user.activeTab} onValueChange={(tab) => setUser({ ...user, activeTab: tab })} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="planner" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Planificador
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Red Colaborativa
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Asistente IA
            </TabsTrigger>
            <TabsTrigger value="predictions" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Predicciones
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Perfil
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Welcome Section */}
            <Card className="bg-gradient-to-r from-red-600 to-rose-600 text-white">
              <CardHeader>
                <CardTitle className="text-2xl">¡Bienvenida, {studentData.name}!</CardTitle>
                <CardDescription className="text-red-100">
                  {studentData.university} • {studentData.semester} • Tipo: Estudiante
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{studentData.gpa}</div>
                    <div className="text-sm text-red-100">GPA Actual</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{studentData.completedTasks}</div>
                    <div className="text-sm text-red-100">Tareas Completadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{studentData.upcomingDeadlines}</div>
                    <div className="text-sm text-red-100">Próximas Entregas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{studentData.studyGroups}</div>
                    <div className="text-sm text-red-100">Grupos de Estudio</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-600" />
                    Progreso Académico
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Tareas Completadas</span>
                      <span>
                        {studentData.completedTasks}/{studentData.totalTasks}
                      </span>
                    </div>
                    <Progress value={(studentData.completedTasks / studentData.totalTasks) * 100} />
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-red-600 border-red-600">
                      En buen ritmo
                    </Badge>
                    {studentData.riskAlerts > 0 && (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {studentData.riskAlerts} alerta de riesgo
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    Próximas Tareas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{task.title}</div>
                        <div className="text-xs text-gray-600">{task.subject}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant={task.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                          {task.due}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Actividad Reciente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{activity.content}</div>
                        <div className="text-xs text-gray-600">hace {activity.time}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>Accede rápidamente a las funciones más utilizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2 bg-transparent"
                    onClick={() => setUser({ ...user, activeTab: "planner" })}
                  >
                    <Calendar className="w-6 h-6" />
                    Planificar Semana
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2 bg-transparent"
                    onClick={() => setUser({ ...user, activeTab: "ai-assistant" })}
                  >
                    <Brain className="w-6 h-6" />
                    Consultar Claude
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2 bg-transparent"
                    onClick={() => setUser({ ...user, activeTab: "network" })}
                  >
                    <Users className="w-6 h-6" />
                    Unirse a Grupo
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col gap-2 bg-transparent"
                    onClick={() => setUser({ ...user, activeTab: "predictions" })}
                  >
                    <TrendingUp className="w-6 h-6" />
                    Ver Predicciones
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other Tabs */}
          <TabsContent value="planner">
            <AcademicPlanner />
          </TabsContent>

          <TabsContent value="network">
            <CollaborativeNetwork />
          </TabsContent>

          <TabsContent value="ai-assistant">
            <AIAssistant />
          </TabsContent>

          <TabsContent value="predictions">
            <GradePrediction />
          </TabsContent>

          <TabsContent value="profile">
            <UserProfile user={user} onLogout={handleLogout} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
