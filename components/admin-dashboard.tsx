"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  BookOpen,
  FileText,
  Settings,
  TrendingUp,
  Shield,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Filter,
  MoreHorizontal,
  GraduationCap,
  UserCheck,
  AlertTriangle,
  Bell,
  LogOut,
} from "lucide-react"

interface AdminDashboardProps {
  onLogout?: () => void
  onViewProfile?: () => void
}

export default function AdminDashboard({ onLogout, onViewProfile }: AdminDashboardProps = {}) {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

  // Datos simulados del administrador
  const adminData = {
    name: "Dr. Roberto Silva",
    email: "roberto.silva@universidad.edu",
    position: "Administrador del Sistema",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  const adminStats = {
    totalUsers: 1247,
    totalCourses: 15,
    totalReports: 89,
    activeUsers: 1000,
    pendingReports: 12,
    systemAlerts: 3,
  }

  const users = [
    {
      id: 1,
      name: "María González",
      email: "maria.gonzalez@universidad.edu",
      role: "Estudiante",
      status: "Activo",
      registrationDate: "2024-01-15",
      lastAccess: "2024-01-20",
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      email: "carlos.mendoza@universidad.edu",
      role: "Profesor",
      status: "Activo",
      registrationDate: "2023-08-10",
      lastAccess: "2024-01-19",
    },
    {
      id: 3,
      name: "Ana Rodríguez",
      email: "ana.rodriguez@universidad.edu",
      role: "Estudiante",
      status: "Inactivo",
      registrationDate: "2023-12-05",
      lastAccess: "2024-01-10",
    },
    {
      id: 4,
      name: "Miguel Torres",
      email: "miguel.torres@universidad.edu",
      role: "Estudiante",
      status: "Activo",
      registrationDate: "2024-01-08",
      lastAccess: "2024-01-20",
    },
  ]

  const courses = [
    {
      id: 1,
      name: "Cálculo III",
      professor: "Dr. Luis Martínez",
      startDate: "2024-01-15",
      endDate: "2024-05-30",
      students: 45,
      status: "Activo",
      progress: 65,
    },
    {
      id: 2,
      name: "Física Cuántica",
      professor: "Dra. Carmen López",
      startDate: "2024-01-20",
      endDate: "2024-06-15",
      students: 32,
      status: "Activo",
      progress: 40,
    },
    {
      id: 3,
      name: "Historia Contemporánea",
      professor: "Prof. Roberto Silva",
      startDate: "2023-08-15",
      endDate: "2023-12-20",
      students: 67,
      status: "Completado",
      progress: 100,
    },
  ]

  const careers = [
    {
      id: 1,
      name: "Ingeniería en Sistemas",
      coordinator: "Dr. Patricia Ruiz",
      students: 234,
      courses: 8,
      status: "Activo",
      duration: "4 años",
    },
    {
      id: 2,
      name: "Medicina",
      coordinator: "Dr. Fernando Castro",
      students: 189,
      courses: 12,
      status: "Activo",
      duration: "6 años",
    },
    {
      id: 3,
      name: "Derecho",
      coordinator: "Dra. Isabel Moreno",
      students: 156,
      courses: 10,
      status: "Activo",
      duration: "5 años",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Activo":
        return <Badge className="bg-green-100 text-green-800 border-green-300">Activo</Badge>
      case "Inactivo":
        return <Badge className="bg-red-100 text-red-800 border-red-300">Inactivo</Badge>
      case "Completado":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Completado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Profesor":
        return <Badge className="bg-purple-100 text-purple-800 border-purple-300">Profesor</Badge>
      case "Estudiante":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Estudiante</Badge>
      case "Administrador":
        return <Badge className="bg-red-100 text-red-800 border-red-300">Administrador</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="w-8 h-8 text-red-600" />
                <h1 className="text-xl font-bold text-gray-900">Panel de Administración</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onViewProfile} className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={adminData.avatar || "/placeholder.svg"} alt={adminData.name} />
                  <AvatarFallback className="text-xs">
                    {adminData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">{adminData.name}</span>
              </Button>
              {onLogout && (
                <Button onClick={onLogout} variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header de Bienvenida */}
          <Card className="bg-gradient-to-r from-red-600 to-rose-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Bienvenido, {adminData.name}
              </CardTitle>
              <CardDescription className="text-red-100">
                Panel de control y gestión de la plataforma académica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-red-100">Usuarios Totales</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{adminStats.totalCourses}</div>
                  <div className="text-sm text-red-100">Cursos Activos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{adminStats.totalReports}</div>
                  <div className="text-sm text-red-100">Reportes Generados</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Métricas del Sistema */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{adminStats.activeUsers.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Usuarios Activos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{adminStats.pendingReports}</div>
                    <div className="text-sm text-gray-600">Reportes Pendientes</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{courses.length}</div>
                    <div className="text-sm text-gray-600">Cursos Disponibles</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{adminStats.systemAlerts}</div>
                    <div className="text-sm text-gray-600">Alertas del Sistema</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Acciones Rápidas */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>Accede rápidamente a las funciones administrativas más utilizadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <Button
                  variant="outline"
                  className="h-20 flex flex-col gap-2 bg-transparent"
                  onClick={() => setActiveTab("users")}
                >
                  <Users className="w-6 h-6" />
                  Usuarios
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col gap-2 bg-transparent"
                  onClick={() => setActiveTab("courses")}
                >
                  <BookOpen className="w-6 h-6" />
                  Cursos
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col gap-2 bg-transparent"
                  onClick={() => setActiveTab("careers")}
                >
                  <GraduationCap className="w-6 h-6" />
                  Carreras
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <FileText className="w-6 h-6" />
                  Reportes
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <TrendingUp className="w-6 h-6" />
                  Análisis
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                  <Settings className="w-6 h-6" />
                  Configuración
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs de Gestión */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Gestión de Usuarios
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Gestión de Cursos
              </TabsTrigger>
              <TabsTrigger value="careers" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Gestión de Carreras
              </TabsTrigger>
            </TabsList>

            {/* Gestión de Usuarios */}
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gestión de Usuarios</CardTitle>
                      <CardDescription>Administra usuarios, roles y permisos del sistema</CardDescription>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Nuevo Usuario
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Buscar usuarios..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtros
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Usuario</th>
                          <th className="text-left p-3 font-medium">Rol</th>
                          <th className="text-left p-3 font-medium">Estado</th>
                          <th className="text-left p-3 font-medium">Registro</th>
                          <th className="text-left p-3 font-medium">Último Acceso</th>
                          <th className="text-left p-3 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-gray-600">{user.email}</div>
                              </div>
                            </td>
                            <td className="p-3">{getRoleBadge(user.role)}</td>
                            <td className="p-3">{getStatusBadge(user.status)}</td>
                            <td className="p-3 text-sm text-gray-600">
                              {new Date(user.registrationDate).toLocaleDateString("es-ES")}
                            </td>
                            <td className="p-3 text-sm text-gray-600">
                              {new Date(user.lastAccess).toLocaleDateString("es-ES")}
                            </td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gestión de Cursos */}
            <TabsContent value="courses" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gestión de Cursos</CardTitle>
                      <CardDescription>Administra cursos, profesores y contenido académico</CardDescription>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Nuevo Curso
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Buscar cursos..." className="pl-10" />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtros
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Curso</th>
                          <th className="text-left p-3 font-medium">Profesor</th>
                          <th className="text-left p-3 font-medium">Fechas</th>
                          <th className="text-left p-3 font-medium">Estudiantes</th>
                          <th className="text-left p-3 font-medium">Estado</th>
                          <th className="text-left p-3 font-medium">Progreso</th>
                          <th className="text-left p-3 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map((course) => (
                          <tr key={course.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <div className="font-medium">{course.name}</div>
                            </td>
                            <td className="p-3 text-sm text-gray-600">{course.professor}</td>
                            <td className="p-3 text-sm text-gray-600">
                              <div>{new Date(course.startDate).toLocaleDateString("es-ES")}</div>
                              <div>{new Date(course.endDate).toLocaleDateString("es-ES")}</div>
                            </td>
                            <td className="p-3">
                              <Badge variant="outline">{course.students} estudiantes</Badge>
                            </td>
                            <td className="p-3">{getStatusBadge(course.status)}</td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-red-600 h-2 rounded-full"
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600">{course.progress}%</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gestión de Carreras */}
            <TabsContent value="careers" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Gestión de Carreras</CardTitle>
                      <CardDescription>Administra programas académicos y coordinadores</CardDescription>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Nueva Carrera
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Buscar carreras..." className="pl-10" />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtros
                    </Button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Carrera</th>
                          <th className="text-left p-3 font-medium">Coordinador</th>
                          <th className="text-left p-3 font-medium">Estudiantes</th>
                          <th className="text-left p-3 font-medium">Cursos</th>
                          <th className="text-left p-3 font-medium">Duración</th>
                          <th className="text-left p-3 font-medium">Estado</th>
                          <th className="text-left p-3 font-medium">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {careers.map((career) => (
                          <tr key={career.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <div className="font-medium">{career.name}</div>
                            </td>
                            <td className="p-3 text-sm text-gray-600">{career.coordinator}</td>
                            <td className="p-3">
                              <Badge variant="outline">{career.students} estudiantes</Badge>
                            </td>
                            <td className="p-3">
                              <Badge variant="outline">{career.courses} cursos</Badge>
                            </td>
                            <td className="p-3 text-sm text-gray-600">{career.duration}</td>
                            <td className="p-3">{getStatusBadge(career.status)}</td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
