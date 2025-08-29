"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  BookOpen,
  BarChart3,
  Settings,
  Shield,
  TrendingUp,
  AlertTriangle,
  Clock,
  FileText,
  Database,
  Activity,
} from "lucide-react"
import Header from "@/components/shared/Header"
import StatCard from "@/components/shared/StatCard"
import AdminProfile from "@/components/features/profile/AdminProfile"
import type { User } from "@/types"

interface AdminDashboardProps {
  user: User
  onLogout: () => void
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [showProfile, setShowProfile] = useState(false)

  if (showProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          user={user}
          onProfileClick={() => setShowProfile(false)}
          onLogout={onLogout}
          title="Perfil de Administrador"
          subtitle="Información profesional y configuración"
        />
        <div className="p-6">
          <AdminProfile user={user} onBack={() => setShowProfile(false)} />
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
        title="Panel de Administración"
        subtitle="Centro de control del sistema académico"
      />

      <div className="p-6 space-y-6">
        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard icon={Users} value="1,247" label="Usuarios Activos" color="text-red-600" />
          <StatCard icon={BookOpen} value="89" label="Cursos Activos" color="text-rose-600" />
          <StatCard icon={TrendingUp} value="94.2%" label="Tasa de Éxito" color="text-red-500" />
          <StatCard icon={AlertTriangle} value="12" label="Alertas Pendientes" color="text-rose-500" />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Resumen General</TabsTrigger>
            <TabsTrigger value="users">Gestión de Usuarios</TabsTrigger>
            <TabsTrigger value="courses">Cursos y Contenido</TabsTrigger>
            <TabsTrigger value="reports">Reportes y Análisis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-red-600" />
                    Estado del Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Servidor Principal</span>
                    <Badge className="bg-green-100 text-green-800">Operativo</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Base de Datos</span>
                    <Badge className="bg-green-100 text-green-800">Operativo</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sistema de IA</span>
                    <Badge className="bg-green-100 text-green-800">Operativo</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Notificaciones</span>
                    <Badge className="bg-yellow-100 text-yellow-800">Mantenimiento</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-red-600" />
                    Actividad Reciente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Nuevo usuario registrado</p>
                      <p className="text-xs text-gray-500">María González - hace 5 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Curso actualizado</p>
                      <p className="text-xs text-gray-500">Matemáticas III - hace 15 minutos</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Backup completado</p>
                      <p className="text-xs text-gray-500">Sistema - hace 1 hora</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Alerta de rendimiento</p>
                      <p className="text-xs text-gray-500">Servidor DB - hace 2 horas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>Tareas administrativas más comunes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                    <Users className="w-6 h-6" />
                    <span>Gestionar Usuarios</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                    <BookOpen className="w-6 h-6" />
                    <span>Crear Curso</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                    <BarChart3 className="w-6 h-6" />
                    <span>Ver Reportes</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                    <Settings className="w-6 h-6" />
                    <span>Configuración</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                    <Database className="w-6 h-6" />
                    <span>Backup Sistema</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                    <Shield className="w-6 h-6" />
                    <span>Seguridad</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription>Administra estudiantes, profesores y otros administradores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Estudiantes Activos</h4>
                        <p className="text-sm text-gray-600">1,089 usuarios registrados</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Todos
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Profesores</h4>
                        <p className="text-sm text-gray-600">142 docentes activos</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Gestionar
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Administradores</h4>
                        <p className="text-sm text-gray-600">16 administradores del sistema</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configurar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cursos y Contenido</CardTitle>
                <CardDescription>Gestiona el contenido académico y los cursos disponibles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Cursos Más Populares</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Matemáticas III</p>
                          <p className="text-sm text-gray-600">234 estudiantes</p>
                        </div>
                        <Badge>Activo</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Física Cuántica</p>
                          <p className="text-sm text-gray-600">189 estudiantes</p>
                        </div>
                        <Badge>Activo</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Historia Contemporánea</p>
                          <p className="text-sm text-gray-600">156 estudiantes</p>
                        </div>
                        <Badge variant="secondary">En Revisión</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Estadísticas de Contenido</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Videos Educativos</span>
                        <span className="font-medium">1,247</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Documentos PDF</span>
                        <span className="font-medium">892</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Ejercicios Interactivos</span>
                        <span className="font-medium">456</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Exámenes</span>
                        <span className="font-medium">234</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reportes y Análisis</CardTitle>
                <CardDescription>Métricas y estadísticas del sistema académico</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Rendimiento Académico
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Promedio General</span>
                        <span className="font-medium text-green-600">8.4</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Tasa de Aprobación</span>
                        <span className="font-medium text-green-600">94.2%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Estudiantes en Riesgo</span>
                        <span className="font-medium text-red-600">67</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Actividad del Sistema
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Usuarios Activos Hoy</span>
                        <span className="font-medium">892</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Sesiones Promedio</span>
                        <span className="font-medium">2.4h</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Consultas IA</span>
                        <span className="font-medium">1,234</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Reportes Disponibles</h4>
                    <Button size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Generar Reporte
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-16 flex flex-col gap-1 bg-transparent">
                      <BarChart3 className="w-5 h-5" />
                      <span className="text-sm">Rendimiento Mensual</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col gap-1 bg-transparent">
                      <Users className="w-5 h-5" />
                      <span className="text-sm">Actividad Usuarios</span>
                    </Button>
                    <Button variant="outline" className="h-16 flex flex-col gap-1 bg-transparent">
                      <BookOpen className="w-5 h-5" />
                      <span className="text-sm">Uso de Cursos</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
