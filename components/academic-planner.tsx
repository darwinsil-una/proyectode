"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
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
  X,
} from "lucide-react"

interface Task {
  id: number
  title: string
  subject: string
  dueDate: string
  priority: "high" | "medium" | "low"
  status: "pending" | "in-progress" | "completed"
  estimatedHours: number
  description: string
  reminder?: boolean
  reminderTime?: string
  createdAt: string
  completedAt?: string
}


const CenteredDialog = ({
  open,
  onOpenChange,
  children,
}: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />

      {}
      <div className="relative z-50 w-full max-w-2xl max-h-[90vh] mx-4 bg-white rounded-lg shadow-xl overflow-hidden">
        {children}
      </div>
    </div>
  )
}

export default function AcademicPlanner() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Ensayo de Historia Contemporánea",
      subject: "Historia",
      dueDate: "2024-01-15",
      priority: "high",
      status: "pending",
      estimatedHours: 8,
      description: "Análisis de la Guerra Fría y sus consecuencias",
      reminder: true,
      reminderTime: "09:00",
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      title: "Laboratorio de Química Orgánica",
      subject: "Química",
      dueDate: "2024-01-17",
      priority: "medium",
      status: "in-progress",
      estimatedHours: 4,
      description: "Síntesis de compuestos aromáticos",
      reminder: false,
      createdAt: "2024-01-08",
    },
    {
      id: 3,
      title: "Proyecto Final de Programación",
      subject: "Informática",
      dueDate: "2024-01-25",
      priority: "high",
      status: "pending",
      estimatedHours: 20,
      description: "Desarrollo de aplicación web con React",
      reminder: true,
      reminderTime: "10:00",
      createdAt: "2024-01-05",
    },
    {
      id: 4,
      title: "Examen de Matemáticas",
      subject: "Matemáticas",
      dueDate: "2024-01-20",
      priority: "high",
      status: "pending",
      estimatedHours: 6,
      description: "Examen parcial de cálculo integral",
      reminder: true,
      reminderTime: "08:00",
      createdAt: "2024-01-12",
    },
    {
      id: 5,
      title: "Presentación de Física",
      subject: "Física",
      dueDate: "2024-01-22",
      priority: "medium",
      status: "pending",
      estimatedHours: 3,
      description: "Presentación sobre mecánica cuántica",
      reminder: false,
      createdAt: "2024-01-09",
    },
  ])

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

  const [newTask, setNewTask] = useState({
    title: "",
    subject: "",
    dueDate: "",
    priority: "medium" as const,
    estimatedHours: 1,
    description: "",
    reminder: false,
    reminderTime: "09:00",
  })

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

    const interval = setInterval(checkReminders, 60000) 
    return () => clearInterval(interval)
  }, [tasks])

  const addTask = () => {
    if (newTask.title && newTask.subject && newTask.dueDate) {
      const task: Task = {
        id: Date.now(),
        ...newTask,
        status: "pending",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setTasks([...tasks, task])
      resetNewTask()
      setShowAddTask(false)
    }
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

  const resetNewTask = () => {
    setNewTask({
      title: "",
      subject: "",
      dueDate: "",
      priority: "medium",
      estimatedHours: 1,
      description: "",
      reminder: false,
      reminderTime: "09:00",
    })
  }

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

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

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

  const getWeekDates = (date: Date) => {
    const week = []
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white"
      case "medium":
        return "bg-rose-400 text-white"
      case "low":
        return "bg-red-200 text-red-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

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

  const getUpcomingTasks = () => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

    return tasks
      .filter((task) => {
        const taskDate = new Date(task.dueDate)
        return taskDate >= today && taskDate <= nextWeek && task.status !== "completed"
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
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

  const TaskForm = ({
    task,
    onSave,
    onCancel,
  }: { task?: Task; onSave: (task: Task) => void; onCancel: () => void }) => {
    const [formData, setFormData] = useState(
      task || {
        id: 0,
        title: "",
        subject: "",
        dueDate: "",
        priority: "medium" as const,
        status: "pending" as const,
        estimatedHours: 1,
        description: "",
        reminder: false,
        reminderTime: "09:00",
        createdAt: new Date().toISOString().split("T")[0],
      },
    )

    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = () => {
      const newErrors: Record<string, string> = {}

      if (!formData.title.trim()) {
        newErrors.title = "El título es obligatorio"
      }
      if (!formData.subject.trim()) {
        newErrors.subject = "La materia es obligatoria"
      }
      if (!formData.dueDate) {
        newErrors.dueDate = "La fecha de entrega es obligatoria"
      }
      if (formData.estimatedHours < 1) {
        newErrors.estimatedHours = "Debe ser al menos 1 hora"
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    const getPriorityIcon = (priority: string) => {
      switch (priority) {
        case "high":
          return "🔴"
        case "medium":
          return "🟡"
        case "low":
          return "🟢"
        default:
          return "⚪"
      }
    }

    const handleSave = () => {
      if (validateForm()) {
        if (task) {
          onSave(formData)
        } else {
          const newTask: Task = {
            ...formData,
            id: Date.now(),
            status: "pending",
            createdAt: new Date().toISOString().split("T")[0],
          }
          onSave(newTask)
        }
      }
    }

    return (
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pb-20">
        {}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <BookOpen className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold">Información Básica</h3>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium flex items-center gap-2">
                <span>Título de la Tarea</span>
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ej: Ensayo sobre la Guerra Fría"
                className={`mt-1 ${errors.title ? "border-red-500" : ""}`}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div>
              <Label htmlFor="subject" className="text-sm font-medium flex items-center gap-2">
                <span>Materia</span>
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Ej: Matemáticas III, Física Cuántica, Historia del Arte..."
                className={`mt-1 ${errors.subject ? "border-red-500" : ""}`}
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Descripción
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe los detalles, objetivos o requisitos de la tarea..."
                className="mt-1 min-h-[80px]"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 caracteres</p>
            </div>
          </div>
        </div>

        {/}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <Calendar className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold">Configuración de Tiempo</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dueDate" className="text-sm font-medium flex items-center gap-2">
                <span>Fecha de Entrega</span>
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={`mt-1 ${errors.dueDate ? "border-red-500" : ""}`}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>}
            </div>

            <div>
              <Label htmlFor="hours" className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Horas Estimadas
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="hours"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.estimatedHours}
                  onChange={(e) => setFormData({ ...formData, estimatedHours: Number.parseInt(e.target.value) || 1 })}
                  className={`${errors.estimatedHours ? "border-red-500" : ""}`}
                />
                <span className="text-sm text-gray-500">horas</span>
              </div>
              {errors.estimatedHours && <p className="text-red-500 text-xs mt-1">{errors.estimatedHours}</p>}
            </div>
          </div>
        </div>

        {/* Prioridad y Estado */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <Target className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold">Prioridad y Estado</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority" className="text-sm font-medium">
                Prioridad
              </Label>
              <Select
                value={formData.priority}
                onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <span>🟢</span>
                      <span>Baja Prioridad</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <span>🟡</span>
                      <span>Media Prioridad</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <span>🔴</span>
                      <span>Alta Prioridad</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {task && (
              <div>
                <Label htmlFor="status" className="text-sm font-medium">
                  Estado
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-gray-400" />
                        <span>Pendiente</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="in-progress">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-rose-600" />
                        <span>En Progreso</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="completed">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-600" />
                        <span>Completada</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <span>Vista previa:</span>
              <div className={`px-2 py-1 rounded text-xs ${getPriorityColor(formData.priority)}`}>
                {getPriorityIcon(formData.priority)} {formData.title || "Título de la tarea"}
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <Bell className="w-5 h-5 text-red-600" />
            <h3 className="text-lg font-semibold">Recordatorios</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <Label htmlFor="reminder" className="text-sm font-medium">
                    Activar recordatorio
                  </Label>
                  <p className="text-xs text-gray-500">Recibe una notificación el día de la entrega</p>
                </div>
              </div>
              <Switch
                id="reminder"
                checked={formData.reminder}
                onCheckedChange={(checked) => setFormData({ ...formData, reminder: checked })}
              />
            </div>

            {formData.reminder && (
              <div className="ml-8 space-y-2">
                <Label htmlFor="reminderTime" className="text-sm font-medium">
                  Hora del recordatorio
                </Label>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <Input
                    id="reminderTime"
                    type="time"
                    value={formData.reminderTime}
                    onChange={(e) => setFormData({ ...formData, reminderTime: e.target.value })}
                    className="w-32"
                  />
                  <span className="text-sm text-gray-500">
                    el día {formData.dueDate ? new Date(formData.dueDate).toLocaleDateString("es-ES") : "de entrega"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {}
        {formData.title && formData.subject && formData.dueDate && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b">
              <Eye className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold">Resumen</h3>
            </div>

            <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg border border-red-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-red-600" />
                  <span className="font-medium">{formData.title}</span>
                  <Badge
                    variant={
                      formData.priority === "high"
                        ? "destructive"
                        : formData.priority === "medium"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {getPriorityIcon(formData.priority)}{" "}
                    {formData.priority === "high" ? "Alta" : formData.priority === "medium" ? "Media" : "Baja"}
                  </Badge>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>📚 Materia: {formData.subject}</div>
                  <div>
                    📅 Entrega:{" "}
                    {new Date(formData.dueDate).toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div>
                    ⏱️ Tiempo estimado: {formData.estimatedHours} hora{formData.estimatedHours !== 1 ? "s" : ""}
                  </div>
                  {formData.reminder && <div>🔔 Recordatorio: {formData.reminderTime}</div>}
                </div>
              </div>
            </div>
          </div>
        )}

        {}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t bg-white sticky bottom-0 mt-6">
          <Button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2"
            disabled={!formData.title || !formData.subject || !formData.dueDate}
          >
            <CheckCircle2 className="w-4 h-4" />
            {task ? "Actualizar Tarea" : "Crear Tarea"}
          </Button>
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 flex items-center justify-center gap-2 bg-transparent"
          >
            <X className="w-4 h-4" />
            Cancelar
          </Button>
        </div>
      </div>
    )
  }

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

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>)
    }

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
        {}
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

        {}
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

        {}
        <div className="grid grid-cols-7 gap-0">{days}</div>

        {}
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

  const filteredTasks = getFilteredTasks()
  const totalHours = filteredTasks.reduce((sum, task) => sum + task.estimatedHours, 0)
  const completedTasks = filteredTasks.filter((task) => task.status === "completed").length
  const upcomingTasks = getUpcomingTasks()

  return (
    <div className="space-y-6">
      {}
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

      {}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{filteredTasks.length}</div>
                <div className="text-sm text-gray-600">Total Tareas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{completedTasks}</div>
                <div className="text-sm text-gray-600">Completadas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-rose-600" />
              <div>
                <div className="text-2xl font-bold">{totalHours}h</div>
                <div className="text-sm text-gray-600">Horas Estimadas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{upcomingTasks.length}</div>
                <div className="text-sm text-gray-600">Próximas (7 días)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {}
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

      {}
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

      {}
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

        {}
        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardContent className="p-6">{renderCalendar()}</CardContent>
          </Card>

          {}
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

                        {}
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
            {filteredTasks.map((task) => (
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

          {filteredTasks.length === 0 && (
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
          <TaskForm
            onSave={(task) => {
              setTasks([...tasks, task])
              setShowAddTask(false)
            }}
            onCancel={() => setShowAddTask(false)}
          />
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
