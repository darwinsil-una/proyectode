"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Award,
  BookOpen,
  Calendar,
  Target,
  TrendingUp,
  Edit,
  Save,
  X,
  University,
  Mail,
  MapPin,
  LogOut,
} from "lucide-react"

interface UserProfileProps {
  onLogout?: () => void
}

export default function UserProfile({ onLogout }: UserProfileProps = {}) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "María González",
    email: "maria.gonzalez@universidad.edu",
    phone: "+1 (555) 123-4567",
    university: "Universidad Nacional",
    career: "Ingeniería en Sistemas",
    semester: "7mo Semestre",
    studentId: "2019-0123",
    location: "Ciudad de México, México",
    bio: "Estudiante apasionada por la tecnología y el desarrollo de software. Me encanta colaborar en proyectos innovadores y ayudar a otros estudiantes.",
    avatar: "/placeholder.svg?height=96&width=96",
  })

  const academicStats = {
    currentGPA: 8.7,
    totalCredits: 180,
    completedCredits: 140,
    coursesCompleted: 28,
    coursesInProgress: 6,
    studyHours: 320,
    projectsCompleted: 15,
  }

  const achievements = [
    {
      id: 1,
      title: "Estudiante Destacado",
      description: "Promedio superior a 8.5 por 3 semestres consecutivos",
      icon: Award,
      color: "text-red-600",
      date: "2023-12-15",
    },
    {
      id: 2,
      title: "Colaborador Activo",
      description: "Participación en más de 10 grupos de estudio",
      icon: User,
      color: "text-rose-600",
      date: "2023-11-20",
    },
    {
      id: 3,
      title: "Mentor Estudiantil",
      description: "Ayudó a 5+ estudiantes a mejorar sus calificaciones",
      icon: BookOpen,
      color: "text-red-500",
      date: "2023-10-10",
    },
    {
      id: 4,
      title: "Innovador Tecnológico",
      description: "Proyecto final reconocido por la facultad",
      icon: TrendingUp,
      color: "text-rose-500",
      date: "2023-09-05",
    },
  ]

  const subjects = [
    { name: "Matemáticas III", grade: 8.5, credits: 6, status: "completed" },
    { name: "Física II", grade: 7.2, credits: 6, status: "in-progress" },
    { name: "Química Orgánica", grade: 9.1, credits: 4, status: "completed" },
    { name: "Historia Contemporánea", grade: 6.8, credits: 3, status: "in-progress" },
    { name: "Programación Avanzada", grade: 9.3, credits: 8, status: "completed" },
    { name: "Base de Datos", grade: 8.8, credits: 6, status: "completed" },
  ]

  const goals = [
    {
      id: 1,
      title: "Mantener GPA superior a 8.5",
      progress: 85,
      target: "2024-06-30",
      status: "on-track",
    },
    {
      id: 2,
      title: "Completar proyecto de tesis",
      progress: 40,
      target: "2024-12-15",
      status: "on-track",
    },
    {
      id: 3,
      title: "Obtener certificación en React",
      progress: 70,
      target: "2024-03-30",
      status: "ahead",
    },
    {
      id: 4,
      title: "Participar en 3 hackathons",
      progress: 33,
      target: "2024-08-30",
      status: "behind",
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    // Aquí implementarías la lógica para guardar los cambios
    console.log("Saving profile data:", profileData)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Aquí restaurarías los datos originales si es necesario
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ahead":
        return "text-red-600"
      case "on-track":
        return "text-rose-600"
      case "behind":
        return "text-red-800"
      default:
        return "text-gray-600"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ahead":
        return "Adelantado"
      case "on-track":
        return "En tiempo"
      case "behind":
        return "Retrasado"
      default:
        return "Sin estado"
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
              <AvatarFallback className="text-2xl">
                {profileData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nombre Completo</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Ubicación</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <University className="w-4 h-4" />
                      <span>
                        {profileData.university} • {profileData.career}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span>
                        {profileData.semester} • ID: {profileData.studentId}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{profileData.location}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Button>
                  {onLogout && (
                    <Button onClick={onLogout} variant="destructive" size="sm" className="ml-2">
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar Sesión
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          {!isEditing && profileData.bio && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">{profileData.bio}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="academic">Académico</TabsTrigger>
          <TabsTrigger value="achievements">Logros</TabsTrigger>
          <TabsTrigger value="goals">Metas</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Award className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{academicStats.currentGPA}</div>
                <div className="text-sm text-gray-600">GPA Actual</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-rose-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{academicStats.coursesCompleted}</div>
                <div className="text-sm text-gray-600">Materias Completadas</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{academicStats.studyHours}</div>
                <div className="text-sm text-gray-600">Horas de Estudio</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{academicStats.projectsCompleted}</div>
                <div className="text-sm text-gray-600">Proyectos Completados</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Progreso de Carrera</CardTitle>
              <CardDescription>Avance hacia la graduación</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Créditos Completados</span>
                    <span>
                      {academicStats.completedCredits}/{academicStats.totalCredits}
                    </span>
                  </div>
                  <Progress value={(academicStats.completedCredits / academicStats.totalCredits) * 100} />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Semestres restantes:</span>
                    <span className="font-medium ml-2">2</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Fecha estimada de graduación:</span>
                    <span className="font-medium ml-2">Diciembre 2024</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Tab */}
        <TabsContent value="academic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial Académico</CardTitle>
              <CardDescription>Calificaciones y progreso por materia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{subject.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{subject.credits} créditos</span>
                        <Badge variant={subject.status === "completed" ? "default" : "secondary"}>
                          {subject.status === "completed" ? "Completada" : "En progreso"}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-2xl font-bold ${
                          subject.grade >= 8 ? "text-red-600" : subject.grade >= 7 ? "text-rose-600" : "text-red-800"
                        }`}
                      >
                        {subject.grade}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon
              return (
                <Card key={achievement.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full bg-gray-100 ${achievement.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{achievement.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                        <div className="text-xs text-gray-500">
                          Obtenido el {new Date(achievement.date).toLocaleDateString("es-ES")}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <div className="space-y-4">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{goal.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Meta: {new Date(goal.target).toLocaleDateString("es-ES")}</span>
                        <Badge className={getStatusColor(goal.status)}>{getStatusLabel(goal.status)}</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progreso</span>
                      <span>{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Agregar Nueva Meta</h3>
              <p className="text-gray-500 mb-4">Define objetivos académicos y profesionales para mantenerte enfocado</p>
              <Button>
                <Target className="w-4 h-4 mr-2" />
                Nueva Meta
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
