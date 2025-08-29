"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Calendar,
  Clock,
  Plus,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Edit,
  Trash2,
  Search,
  Download,
  Upload,
  Bell,
  Eye,
  EyeOff,
  MoreHorizontal,
  Copy,
  Target,
} from "lucide-react"
import TaskForm from "./TaskForm"
import StatCard from "@/components/shared/StatCard"
import { TaskService } from "@/services/taskService"
import { getDaysInMonth, getFirstDayOfMonth, getWeekDates } from "@/lib/utils/date"
import { getPriorityColor } from "@/lib/utils/grade"
import type { Task } from "@/types"

// Agregar este componente personalizado antes del componente principal:
const CenteredDialog = ({
  open,
  onOpenChange,
  children,
}: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />

      {/* Modal Content */}
      <div className="relative z-50 w-full max-w-2xl max-h-[90vh] mx-4 bg-white rounded-lg shadow-xl overflow-hidden">
        {children}
      </div>
    </div>
  )
}

export default function AcademicPlanner() {
  const [tasks, setTasks] = useState<Task[]>(TaskService.getInitialTasks())
  const [showAddTask, setShowAddTask] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPriority, setFilterPriority] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showCompleted, setShowCompleted] = useState(true)
  const [viewMode, setViewMode] = useState<"month" | "week">("month")
  const [notifications, setNotifications] = useState<string[]>([])

  // Efectos para notificaciones y recordatorios
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date()
      const today = now.toISOString().split("T")[0]
      const currentTime = now.toTimeString().slice(0, 5)

      tasks.forEach((task) => {
        if (
          task.reminder &&
          task.reminderTime &&
          task.dueDate === today &&
          task.reminderTime === currentTime &&
          task.status !== "completed"
        ) {
          setNotifications((prev) => [...prev, `Recordatorio: ${task.title} - ${task.subject}`])
        }
      })
    }

    const interval = setInterval(checkReminders, 60000) // Verificar cada minuto
    return () => clearInterval(interval)
  }, [tasks])

  // Funciones CRUD
  const addTask = (task: Task) => {
    setTasks([...tasks, task])
    setShowAddTask(false)
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setEditingTask(null)
  }

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const duplicateTask = (task: Task) => {
    const duplicated: Task = {
      ...task,
      id: Date.now(),
      title: `${task.title} (Copia)`,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
      completedAt: undefined,
    }
    setTasks([...tasks, duplicated])
  }

  const toggleTaskStatus = (taskId: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          const newStatus = task.status === "completed" ? "pending" : "completed"
          return {
            ...task,
            status: newStatus,
            completedAt: newStatus === "completed" ? new Date().toISOString().split("T")[0] : undefined,
          }
        }
        return task
      }),
    )
  }

  // Funciones de filtrado y búsqueda
  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesPriority = filterPriority === "all" || task.priority === filterPriority
      const matchesStatus = filterStatus === "all" || task.status === filterStatus
      const showTask = showCompleted || task.status !== "completed"

      return matchesSearch && matchesPriority && matchesStatus && showTask
    })
  }

  // Funciones del calendario
  const getTasksForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return getFilteredTasks().filter((task) => task.dueDate === dateString)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  // Funciones de utilidad
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-red-600" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-rose-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const upcomingTasks = TaskService.getUpcomingTasks(tasks)
  const taskStats = TaskService.calculateTaskStats(getFilteredTasks())

  // Renderizado del calendario
  const renderCalendar = () => {
    if (viewMode === "week") {
      return renderWeekView()
    }

    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ]
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

    // Espacios vacíos para los días antes del primer día del mes
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>)
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const tasksForDay = getTasksForDate(date)
      const isToday = new Date().toDateString() === date.toDateString()

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-1 cursor-pointer hover:bg-red-50 transition-colors ${
            isToday ? "bg-red-100 border-red-300" : ""
          }`}
          onClick={() => setSelectedDate(date)}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? "text-red-600" : "text-gray-700"}`}>{day}</div>
          <div className="space-y-1">
            {tasksForDay.slice(0, 2).map((task) => (
              <div
                key={task.id}
                className={`text-xs p-1 rounded truncate ${getPriorityColor(task.priority)}`}
                title={task.title}
              >
                {task.title}
              </div>
            ))}
            {tasksForDay.length > 2 && <div className="text-xs text-gray-500">+{tasksForDay.length - 2} más</div>}
          </div>
        </div>,
      )
    }

    return (
      <div className="space-y-4">
        {/* Header del calendario */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Hoy
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "month" ? "week" : "month")}>
              {viewMode === "month" ? "Vista Semanal" : "Vista Mensual"}
            </Button>
          </div>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-0">
          {dayNames.map((day) => (
            <div
              key={day}
              className="h-10 border border-gray-200 bg-gray-50 flex items-center justify-center font-medium text-sm"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Días del mes */}
        <div className="grid grid-cols-7 gap-0">{days}</div>

        {/* Leyenda */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Alta prioridad</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-rose-400 rounded"></div>
            <span>Media prioridad</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-200 rounded"></div>
            <span>Baja prioridad</span>
          </div>
        </div>
      </div>
    )
  }

  const renderWeekView = () => {
    const weekDates = getWeekDates(currentDate)
    const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            Semana del {weekDates[0].getDate()} al {weekDates[6].getDate()} de{" "}
            {weekDates[0].toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
          </h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Hoy
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setViewMode("month")}>
              Vista Mensual
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDates.map((date, index) => {
            const tasksForDay = getTasksForDate(date)
            const isToday = new Date().toDateString() === date.toDateString()

            return (
              <Card
                key={index}
                className={`cursor-pointer hover:shadow-md transition-shadow ${isToday ? "ring-2 ring-red-500" : ""}`}
                onClick={() => setSelectedDate(date)}
              >
                <CardHeader className="p-3">
                  <CardTitle className={`text-sm ${isToday ? "text-red-600" : ""}`}>{dayNames[index]}</CardTitle>
                  <CardDescription className={`text-lg font-bold ${isToday ? "text-red-600" : ""}`}>
                    {date.getDate()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="space-y-1">
                    {tasksForDay.map((task) => (
                      <div
                        key={task.id}
                        className={`text-xs p-2 rounded ${getPriorityColor(task.priority)}`}
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `tareas_academicas_${new Date().toISOString().split("T")[0]}.json`
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const importTasks = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedTasks = JSON.parse(e.target?.result as string)
          setTasks([...tasks, ...importedTasks])
        } catch (error) {
          alert("Error al importar el archivo. Asegúrate de que sea un archivo JSON válido.")
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Notificaciones */}
      {notifications.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-5 h-5 text-red-600" />
              <h4 className="font-semibold text-red-800">Recordatorios</h4>
            </div>
            {notifications.map((notification, index) => (
              <div key={index} className="text-sm text-red-700 mb-1">
                {notification}
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={() => setNotifications([])} className="mt-2">
              Marcar como leído
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Header with Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} value={taskStats.totalTasks} label="Total Tareas" color="text-red-600" />
        <StatCard icon={CheckCircle2} value={taskStats.completedTasks} label="Completadas" color="text-red-600" />
        <StatCard icon={Clock} value={`${taskStats.totalHours}h`} label="Horas Estimadas" color="text-rose-600" />
        <StatCard icon={AlertCircle} value={taskStats.upcomingTasks} label="Próximas (7 días)" color="text-red-600" />
      </div>

      {/* Controles principales */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold">Planificador Académico</h2>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setShowAddTask(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nueva Tarea
          </Button>
          <Button variant="outline" onClick={exportTasks} className="flex items-center gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Exportar
          </Button>
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={importTasks}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Upload className="w-4 h-4" />
              Importar
            </Button>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar tareas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Prioridad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="low">Baja</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="in-progress">En progreso</SelectItem>
                  <SelectItem value="completed">Completada</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCompleted(!showCompleted)}
                className="flex items-center gap-2"
              >
                {showCompleted ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {showCompleted ? "Ocultar" : "Mostrar"} completadas
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs para Vista de Calendario y Lista */}
      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            Vista Calendario
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Vista Lista
          </TabsTrigger>
        </TabsList>

        {/* Vista de Calendario */}
        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardContent className="p-6">{renderCalendar()}</CardContent>
          </Card>

          {/* Detalles de fecha seleccionada */}
          {selectedDate && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Tareas para{" "}
                  {selectedDate.toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getTasksForDate(selectedDate).length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No hay tareas programadas para esta fecha</p>
                  ) : (
                    getTasksForDate(selectedDate).map((task) => (
                      <div key={task.id} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button onClick={() => toggleTaskStatus(task.id)}>{getStatusIcon(task.status)}</button>
                            <div>
                              <h4
                                className={`font-medium text-lg ${task.status === "completed" ? "line-through" : ""}`}
                              >
                                {task.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant={
                                    task.priority === "high"
                                      ? "destructive"
                                      : task.priority === "medium"
                                        ? "default"
                                        : "secondary"
                                  }
                                >
                                  {task.priority === "high"
                                    ? "🔴 Alta"
                                    : task.priority === "medium"
                                      ? "🟡 Media"
                                      : "🟢 Baja"}
                                </Badge>
                                <Badge variant="outline">
                                  {task.status === "pending"
                                    ? "Pendiente"
                                    : task.status === "in-progress"
                                      ? "En progreso"
                                      : "Completada"}
                                </Badge>
                                {task.reminder && (
                                  <Bell className="w-4 h-4 text-rose-600" />
                                )}
                              </div>
                            </div>
                          </div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48">
                              <div className="space-y-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start"
                                  onClick={() => setEditingTask(task)}
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Editar
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start"
                                  onClick={() => duplicateTask(task)}
                                >
                                  <Copy className="w-4 h-4 mr-2" />
                                  Duplicar
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="sm" className="w-full justify-start text-red-600">
                                      <Trash2 className="w-4 h-4 mr-2" />
                                      Eliminar
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>¿Eliminar tarea?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Esta acción no se puede deshacer. La tarea será eliminada permanentemente.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => deleteTask(task.id)}>
                                        Eliminar
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>

                        {/* Detalles de la tarea */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">Materia:</span>
                            <span className="font-medium">{task.subject}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">Entrega:</span>
                            <span className="font-medium">{new Date(task.dueDate).toLocaleDateString("es-ES")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">Estimado:</span>
                            <span className="font-medium">{task.estimatedHours}h</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">Creada:</span>
                            <span className="font-medium">{new Date(task.createdAt).toLocaleDateString("es-ES")}</span>
                          </div>
                        </div>

                        {/* Descripción */}
                        {task.description && (
                          <div className="pt-2 border-t">
                            <p className="text-sm text-gray-700">
                              <span className="font-medium text-gray-600">Descripción: </span>
                              {task.description}
                            </p>
                          </div>
                        )}

                        {/* Recordatorio */}
                        {task.reminder && task.reminderTime && (
                          <div className="flex items-center gap-2 text-sm text-rose-600 bg-rose-50 p-2 rounded">
                            <Bell className="w-4 h-4" />
                            <span>Recordatorio programado para las {task.reminderTime}</span>
                          </div>
                        )}

                        {/* Fecha de completado */}
                        {task.status === "completed" && task.completedAt && (
                          <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-2 rounded">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Completada el {new Date(task.completedAt).toLocaleDateString("es-ES")}</span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Vista de Lista */}
        <TabsContent value="list" className="space-y-6">
          <div className="space-y-4">
            {getFilteredTasks().map((task) => (
              <Card key={task.id} className={task.status === "completed" ? "opacity-75" : ""}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Header con título y acciones */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <button onClick={() => toggleTaskStatus(task.id)} className="mt-1">
                          {getStatusIcon(task.status)}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3
                              className={`text-lg font-semibold ${task.status === "completed" ? "line-through" : ""}`}
                            >
                              {task.title}
                            </h3>
                            <Badge
                              variant={
                                task.priority === "high"
                                  ? "destructive"
                                  : task.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {task.priority === "high"
                                ? "🔴 Alta"
                                : task.priority === "medium"
                                  ? "🟡 Media"
                                  : "🟢 Baja"}
                            </Badge>
                            <Badge variant="outline">
                              {task.status === "pending"
                                ? "Pendiente"
                                : task.status === "in-progress"
                                  ? "En progreso"
                                  : "Completada"}
                            </Badge>
                            {task.reminder && <Bell className="w-4 h-4 text-rose-600" />}
                          </div>
                        </div>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48">
                          <div className="space-y-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start"
                              onClick={() => setEditingTask(task)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start"
                              onClick={() => duplicateTask(task)}
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              Duplicar
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-full justify-start text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Eliminar
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>¿Eliminar tarea?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. La tarea será eliminada permanentemente.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteTask(task.id)}>Eliminar</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Detalles principales */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <div>
                          <span className="text-gray-600">Materia</span>
                          <p className="font-medium">{task.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <span className="text-gray-600">Fecha de entrega</span>
                          <p className="font-medium">
                            {new Date(task.dueDate).toLocaleDateString("es-ES", {
                              weekday: "short",
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                          <span className="text-gray-600">Tiempo estimado</span>
                          <p className="font-medium">
                            {task.estimatedHours} hora{task.estimatedHours !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-gray-500" />
                        <div>
                          <span className="text-gray-600">Fecha de creación</span>
                          <p className="font-medium">{new Date(task.createdAt).toLocaleDateString("es-ES")}</p>
                        </div>
                      </div>
                    </div>

                    {/* Descripción */}
                    {task.description && (
                      <div className="pt-3 border-t">
                        <h4 className="text-sm font-medium text-gray-600 mb-2">Descripción</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">{task.description}</p>
                      </div>
                    )}

                    {/* Información adicional */}
                    <div className="flex flex-wrap gap-3 pt-3 border-t">
                      {task.reminder && task.reminderTime && (
                        <div className="flex items-center gap-2 text-sm text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                          <Bell className="w-4 h-4" />
                          <span>Recordatorio: {task.reminderTime}</span>
                        </div>
                      )}

                      {task.status === "completed" && task.completedAt && (
                        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Completada: {new Date(task.completedAt).toLocaleDateString("es-ES")}</span>
                        </div>
                      )}

                      {task.status === "pending" && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                          <AlertCircle className="w-4 h-4" />
                          <span>
                            Días restantes:{" "}
                            {Math.ceil(
                              (new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {getFilteredTasks().length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No hay tareas que coincidan con los filtros
                </h3>
                <p className="text-gray-500 mb-4">Ajusta los filtros o agrega una nueva tarea</p>
                <Button onClick={() => setShowAddTask(true)}>Agregar Nueva Tarea</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Formulario para agregar tarea */}
      <CenteredDialog open={showAddTask} onOpenChange={setShowAddTask}>
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Agregar Nueva Tarea</h2>
          <p className="text-sm text-gray-600 mt-1">Planifica tu trabajo académico de manera inteligente</p>
        </div>
        <div className="p-6">
          <TaskForm onSave={addTask} onCancel={() => setShowAddTask(false)} />
        </div>
      </CenteredDialog>

      {/* Formulario para editar tarea */}
      <CenteredDialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Editar Tarea</h2>
          <p className="text-sm text-gray-600 mt-1">Modifica los detalles de tu tarea académica</p>
        </div>
        <div className="p-6">
          {editingTask && <TaskForm task={editingTask} onSave={updateTask} onCancel={() => setEditingTask(null)} />}
        </div>
      </CenteredDialog>

      {/* Panel de tareas próximas */}
      {upcomingTasks.length > 0 && (
        <Card className="border-rose-200 bg-rose-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-800">
              <AlertCircle className="w-5 h-5" />
              Tareas Próximas (7 días)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-2 bg-white rounded">
                  <div>
                    <span className="font-medium">{task.title}</span>
                    <span className="text-sm text-gray-600 ml-2">
                      - {new Date(task.dueDate).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                  <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>
                    {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Media" : "Baja"}
                  </Badge>
                </div>
              ))}
              {upcomingTasks.length > 3 && (
                <p className="text-sm text-rose-600">Y {upcomingTasks.length - 3} tareas más...</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
