"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { BookOpen, Calendar, Clock, Target, Bell, Eye, CheckCircle2, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/types"

interface TaskFormProps {
  task?: Task
  onSave: (task: Task) => void
  onCancel: () => void
}

export default function TaskForm({ task, onSave, onCancel }: TaskFormProps) {
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
      {/* Información básica */}
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

      {/* Configuración de tiempo */}
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

        {/* Vista previa de prioridad */}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <span>Vista previa:</span>
            <div className={`px-2 py-1 rounded text-xs ${getPriorityColor(formData.priority)}`}>
              {getPriorityIcon(formData.priority)} {formData.title || "Título de la tarea"}
            </div>
          </div>
        </div>
      </div>

      {/* Recordatorios */}
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

      {/* Resumen */}
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

      {/* Botones de acción */}
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

function getPriorityColor(priority: string): string {
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

function AlertCircle({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  )
}
