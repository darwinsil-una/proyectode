"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Target,
  TrendingUp,
  Clock,
  Star,
  Edit,
  CheckCircle,
} from "lucide-react"
import type { User as UserType } from "@/types"

interface UserProfileProps {
  user: UserType
  onBack: () => void
}

export default function UserProfile({ user, onBack }: UserProfileProps) {
  const studentData = {
    university: "Universidad Nacional Autónoma de México",
    career: "Ingeniería en Sistemas Computacionales",
    semester: "7mo Semestre",
    studentId: "2021-0234567",
    startDate: "Agosto 2021",
    gpa: 8.7,
    completedCredits: 280,
    totalCredits: 400,
    bio: "Estudiante apasionada por la tecnología y el desarrollo de software. Me especializo en desarrollo web y inteligencia artificial. Siempre busco nuevos desafíos y oportunidades para aprender.",
  }

  const achievements = [
    { name: "Estudiante Destacado", description: "Top 10% de la generación", date: "2024" },
    { name: "Proyecto Innovador", description: "Mejor proyecto de IA del semestre", date: "2023" },
    { name: "Colaborador Activo", description: "Más de 50 contribuciones en foros", date: "2023" },
    { name: "Mentor Estudiantil", description: "Ayudó a 15+ estudiantes", date: "2024" },
  ]

  const subjects = [
    { name: "Matemáticas III", grade: 9.2, credits: 8, status: "Completada" },
    { name: "Física Cuántica", grade: 8.5, credits: 6, status: "En Curso" },
    { name: "Química Orgánica", grade: 9.0, credits: 8, status: "Completada" },
    { name: "Historia Contemporánea", grade: 7.8, credits: 6, status: "En Curso" },
    { name: "Programación Avanzada", grade: 9.5, credits: 10, status: "Completada" },
  ]

  const activities = [
    { action: "Completó tarea de Matemáticas III", time: "hace 2 horas", type: "task" },
    { action: "Participó en foro de Física", time: "hace 5 horas", type: "forum" },
    { action: "Consultó con Claude sobre derivadas", time: "hace 1 día", type: "ai" },
    { action: "Se unió al grupo de estudio de Química", time: "hace 2 días", type: "group" },
    { action: "Subió calificación en Historia", time: "hace 3 días", type: "grade" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Dashboard
        </Button>
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Edit className="w-4 h-4" />
                Editar Foto
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-red-100 text-red-800">Estudiante Activo</Badge>
                  <Badge variant="outline">Nivel Avanzado</Badge>
                  <Badge variant="outline">Mentor</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>+52 55 1234 5678</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>Ciudad de México, México</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Miembro desde {studentData.startDate}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-gray-700 leading-relaxed">{studentData.bio}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="academic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="academic">Información Académica</TabsTrigger>
          <TabsTrigger value="achievements">Logros y Reconocimientos</TabsTrigger>
          <TabsTrigger value="activity">Actividad Reciente</TabsTrigger>
        </TabsList>

        <TabsContent value="academic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Academic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Información Académica
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Universidad</Label>
                  <p className="font-medium">{studentData.university}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Carrera</Label>
                  <p className="font-medium">{studentData.career}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Semestre</Label>
                    <p className="font-medium">{studentData.semester}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Matrícula</Label>
                    <p className="font-medium">{studentData.studentId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Progreso Académico
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">{studentData.gpa}</div>
                  <div className="text-sm text-gray-600">Promedio General</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Créditos Completados</span>
                    <span>
                      {studentData.completedCredits}/{studentData.totalCredits}
                    </span>
                  </div>
                  <Progress value={(studentData.completedCredits / studentData.totalCredits) * 100} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round((studentData.completedCredits / studentData.totalCredits) * 100)}% completado
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-blue-600">15</div>
                    <div className="text-xs text-gray-600">Materias Aprobadas</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-green-600">4</div>
                    <div className="text-xs text-gray-600">En Curso</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subjects */}
          <Card>
            <CardHeader>
              <CardTitle>Materias y Calificaciones</CardTitle>
              <CardDescription>Historial académico detallado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {subjects.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{subject.name}</h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span>{subject.credits} créditos</span>
                        <Badge variant={subject.status === "Completada" ? "default" : "secondary"}>
                          {subject.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold ${
                          subject.grade >= 9
                            ? "text-green-600"
                            : subject.grade >= 8
                              ? "text-blue-600"
                              : subject.grade >= 7
                                ? "text-yellow-600"
                                : "text-red-600"
                        }`}
                      >
                        {subject.grade}
                      </div>
                      <div className="text-xs text-gray-500">Calificación</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Estadísticas de Rendimiento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-600">127</div>
                    <div className="text-sm text-gray-600">Tareas Completadas</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rose-600">89</div>
                    <div className="text-sm text-gray-600">Días Activo</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-500">45</div>
                    <div className="text-sm text-gray-600">Foros Participados</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-rose-500">23</div>
                    <div className="text-sm text-gray-600">Consultas IA</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ranking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Posición en Rankings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium">Ranking General</p>
                    <p className="text-sm text-gray-600">En tu generación</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-red-600">#12</div>
                    <div className="text-xs text-gray-500">de 234</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">Ranking por Carrera</p>
                    <p className="text-sm text-gray-600">Ingeniería en Sistemas</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">#8</div>
                    <div className="text-xs text-gray-500">de 89</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">Participación</p>
                    <p className="text-sm text-gray-600">Actividad en plataforma</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-600">#3</div>
                    <div className="text-xs text-gray-500">de 234</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Logros y Reconocimientos
              </CardTitle>
              <CardDescription>Tus logros más destacados en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{achievement.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <Badge variant="outline" className="text-xs">
                        {achievement.date}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Actividad Reciente
              </CardTitle>
              <CardDescription>Tu actividad en la plataforma durante los últimos días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 border-l-4 border-red-200 bg-red-50 rounded-r-lg"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === "task"
                          ? "bg-green-100"
                          : activity.type === "forum"
                            ? "bg-blue-100"
                            : activity.type === "ai"
                              ? "bg-purple-100"
                              : activity.type === "group"
                                ? "bg-orange-100"
                                : "bg-red-100"
                      }`}
                    >
                      {activity.type === "task" && <CheckCircle className="w-4 h-4 text-green-600" />}
                      {activity.type === "forum" && <MessageSquare className="w-4 h-4 text-blue-600" />}
                      {activity.type === "ai" && <Brain className="w-4 h-4 text-purple-600" />}
                      {activity.type === "group" && <Users className="w-4 h-4 text-orange-600" />}
                      {activity.type === "grade" && <TrendingUp className="w-4 h-4 text-red-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>
}

function MessageSquare({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  )
}

function Brain({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  )
}

function Users({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
      />
    </svg>
  )
}
