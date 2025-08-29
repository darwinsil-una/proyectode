"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Shield,
  Settings,
  Users,
  BookOpen,
  FileText,
  Edit,
  Save,
  X,
  University,
  Mail,
  MapPin,
  ArrowLeft,
  Calendar,
  Award,
  TrendingUp,
  Activity,
} from "lucide-react"

interface AdminProfileProps {
  onBack?: () => void
  onLogout?: () => void
}

export default function AdminProfile({ onBack, onLogout }: AdminProfileProps = {}) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Dr. Roberto Silva",
    email: "roberto.silva@universidad.edu",
    phone: "+1 (555) 987-6543",
    university: "Universidad Nacional",
    department: "Administración Académica",
    position: "Administrador del Sistema",
    employeeId: "ADM-2019-001",
    startDate: "2019-03-15",
    location: "Ciudad de México, México",
    bio: "Administrador del sistema académico con más de 15 años de experiencia en gestión educativa y tecnología. Especializado en optimización de procesos académicos y implementación de soluciones tecnológicas.",
    avatar: "/placeholder.svg?height=96&width=96",
  })

  const adminStats = {
    usersManaged: 1247,
    coursesSupervised: 15,
    systemsAdministered: 8,
    yearsExperience: 15,
    projectsCompleted: 23,
    reportsGenerated: 89,
  }

  const responsibilities = [
    {
      id: 1,
      title: "Gestión de Usuarios",
      description: "Administración de cuentas de estudiantes, profesores y personal",
      icon: Users,
      color: "text-blue-600",
    },
    {
      id: 2,
      title: "Supervisión de Cursos",
      description: "Monitoreo y gestión del contenido académico y programas",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      id: 3,
      title: "Reportes y Análisis",
      description: "Generación de informes estadísticos y análisis de rendimiento",
      icon: FileText,
      color: "text-purple-600",
    },
    {
      id: 4,
      title: "Configuración del Sistema",
      description: "Mantenimiento y configuración de la plataforma académica",
      icon: Settings,
      color: "text-orange-600",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "Creó nuevo usuario",
      details: "Estudiante: Ana María López",
      timestamp: "2024-01-20 14:30",
      type: "user",
    },
    {
      id: 2,
      action: "Actualizó curso",
      details: "Cálculo III - Cambió fechas de examen",
      timestamp: "2024-01-20 11:15",
      type: "course",
    },
    {
      id: 3,
      action: "Generó reporte",
      details: "Estadísticas de rendimiento Q4 2023",
      timestamp: "2024-01-19 16:45",
      type: "report",
    },
    {
      id: 4,
      action: "Configuró sistema",
      details: "Actualizó políticas de seguridad",
      timestamp: "2024-01-19 09:20",
      type: "system",
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    console.log("Saving admin profile data:", profileData)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return <Users className="w-4 h-4 text-blue-600" />
      case "course":
        return <BookOpen className="w-4 h-4 text-green-600" />
      case "report":
        return <FileText className="w-4 h-4 text-purple-600" />
      case "system":
        return <Settings className="w-4 h-4 text-orange-600" />
      default:
        return <Activity className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Volver al Dashboard
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-red-100 text-red-800 border-red-300 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Administrador
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt={profileData.name} />
                  <AvatarFallback className="text-2xl bg-red-100 text-red-600">
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
                      <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                        {profileData.name}
                        <Shield className="w-6 h-6 text-red-600" />
                      </h1>
                      <div className="space-y-2 text-gray-600">
                        <div className="flex items-center gap-2">
                          <University className="w-4 h-4" />
                          <span>
                            {profileData.university} • {profileData.department}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>
                            {profileData.position} • ID: {profileData.employeeId}
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
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>En el cargo desde: {new Date(profileData.startDate).toLocaleDateString("es-ES")}</span>
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
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar Perfil
                    </Button>
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="responsibilities">Responsabilidades</TabsTrigger>
              <TabsTrigger value="activity">Actividad Reciente</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{adminStats.usersManaged.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Usuarios Gestionados</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <BookOpen className="w-8 h-8 text-rose-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{adminStats.coursesSupervised}</div>
                    <div className="text-sm text-gray-600">Cursos Supervisados</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Settings className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{adminStats.systemsAdministered}</div>
                    <div className="text-sm text-gray-600">Sistemas Administrados</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Award className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{adminStats.yearsExperience}</div>
                    <div className="text-sm text-gray-600">Años de Experiencia</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{adminStats.projectsCompleted}</div>
                    <div className="text-sm text-gray-600">Proyectos Completados</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <FileText className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{adminStats.reportsGenerated}</div>
                    <div className="text-sm text-gray-600">Reportes Generados</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Experiencia Profesional</CardTitle>
                  <CardDescription>Trayectoria en administración académica</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progreso en el cargo actual</span>
                        <span>{adminStats.yearsExperience} años</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Próxima evaluación:</span>
                        <span className="font-medium ml-2">Marzo 2024</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Certificaciones:</span>
                        <span className="font-medium ml-2">3 activas</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Responsibilities Tab */}
            <TabsContent value="responsibilities" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {responsibilities.map((responsibility) => {
                  const IconComponent = responsibility.icon
                  return (
                    <Card key={responsibility.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-full bg-gray-100 ${responsibility.color}`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{responsibility.title}</h3>
                            <p className="text-sm text-gray-600">{responsibility.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className="p-2 bg-gray-100 rounded-lg">{getActivityIcon(activity.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{activity.action}</h4>
                            <span className="text-xs text-gray-500">{activity.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
