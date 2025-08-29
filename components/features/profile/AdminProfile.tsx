"use client"

import { Label } from "@/components/ui/label"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Shield,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  BookOpen,
  Settings,
  Award,
  Target,
  TrendingUp,
  Edit,
  FileText,
} from "lucide-react"
import type { User } from "@/types"

interface AdminProfileProps {
  user: User
  onBack: () => void
}

export default function AdminProfile({ user, onBack }: AdminProfileProps) {
  const adminData = {
    position: "Director de Tecnología Académica",
    department: "Sistemas y Tecnología Educativa",
    employeeId: "ADM-2019-001",
    startDate: "Enero 2019",
    yearsExperience: 15,
    location: "Campus Central - Edificio Administrativo",
    bio: "Administrador de sistemas académicos con más de 15 años de experiencia en tecnología educativa. Especializado en la implementación y gestión de plataformas de aprendizaje digital, análisis de datos académicos y optimización de procesos educativos.",
  }

  const responsibilities = [
    {
      title: "Gestión de Usuarios",
      description: "Administración de cuentas de estudiantes, profesores y personal",
      icon: Users,
      metrics: "1,247 usuarios activos",
    },
    {
      title: "Supervisión de Cursos",
      description: "Oversight de contenido académico y estructura curricular",
      icon: BookOpen,
      metrics: "89 cursos supervisados",
    },
    {
      title: "Reportes y Análisis",
      description: "Generación de reportes de rendimiento y estadísticas",
      icon: FileText,
      metrics: "156 reportes generados",
    },
    {
      title: "Configuración del Sistema",
      description: "Mantenimiento y configuración de la plataforma",
      icon: Settings,
      metrics: "99.8% uptime",
    },
  ]

  const recentActivity = [
    { action: "Aprobó nuevo curso de Matemáticas Avanzadas", time: "hace 1 hora", type: "approval" },
    { action: "Generó reporte mensual de rendimiento", time: "hace 3 horas", type: "report" },
    { action: "Actualizó configuración de notificaciones", time: "hace 5 horas", type: "config" },
    { action: "Revisó solicitudes de nuevos usuarios", time: "hace 1 día", type: "user" },
    { action: "Realizó backup del sistema", time: "hace 2 días", type: "system" },
    { action: "Participó en reunión de coordinación", time: "hace 3 días", type: "meeting" },
  ]

  const achievements = [
    { name: "Implementación Exitosa", description: "Migración completa del sistema legacy", date: "2023" },
    { name: "Excelencia Operativa", description: "99.9% uptime durante todo el año", date: "2023" },
    { name: "Innovación Tecnológica", description: "Integración de IA en la plataforma", date: "2024" },
    { name: "Liderazgo Académico", description: "Reconocimiento por mejoras en eficiencia", date: "2024" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Dashboard
        </Button>
        <h1 className="text-2xl font-bold">Perfil de Administrador</h1>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-2xl">
                  {user.name.split(" ").map(n => n[0]).join("")}
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
                  <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Administrador
                  </Badge>
                  <Badge variant="outline">Nivel Senior</Badge>
                  <Badge variant="outline">{adminData.yearsExperience} años exp.</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>+52 55 5678 9012</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{adminData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>En el cargo desde {adminData.startDate}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-gray-700 leading-relaxed">{adminData.bio}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="responsibilities">Responsabilidades</TabsTrigger>
          <TabsTrigger value="activity">Actividad Reciente</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Professional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Información Profesional
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Cargo</Label>
                  <p className="font-medium">{adminData.position}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Departamento</Label>
                  <p className="font-medium">{adminData.department}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-600">ID Empleado</Label>
                    <p className="font-medium">{adminData.employeeId}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Experiencia</Label>
                    <p className="font-medium">{adminData.yearsExperience} años</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Métricas de Rendimiento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 mb-1">98.5%</div>
                  <div className="text-sm text-gray-600">Eficiencia del Sistema</div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progreso en Objetivos Anuales</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">
                    Próxima evaluación: Diciembre 2024
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-blue-600">23</div>
                    <div className="text-xs text-gray-600">Proyectos Completados</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-green-600">89</div>
                    <div className="text-xs text-gray-600">Reportes Generados</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Estadísticas Administrativas
              </CardTitle>
              <CardDescription>Resumen de tu gestión en la plataforma</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">1,247</div>
                  <div className="text-sm text-gray-600">Usuarios Gestionados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-600">15</div>
                  <div className="text-sm text-gray-600">Cursos Supervisados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">8</div>
                  <div className="text-sm text-gray-600">Sistemas Administrados</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-500">99.8%</div>
                  <div className="text-sm text-gray-600">Uptime del Sistema</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Certificaciones y Logros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* ...rest of your content here... */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Add closing for TabsContent and Tabs if needed */}
      </Tabs>
    </div>
  );
}
