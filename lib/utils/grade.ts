import type { Subject } from "@/types"

export const getPriorityColor = (priority: string): string => {
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

export const getRiskColor = (risk: string): string => {
  switch (risk) {
    case "low":
      return "text-red-600 bg-red-50 border-red-200"
    case "medium":
      return "text-rose-600 bg-rose-50 border-rose-200"
    case "high":
      return "text-red-800 bg-red-100 border-red-300"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

export const getRiskLabel = (risk: string): string => {
  switch (risk) {
    case "low":
      return "Bajo Riesgo"
    case "medium":
      return "Riesgo Medio"
    case "high":
      return "Alto Riesgo"
    default:
      return "Sin Datos"
  }
}

export const calculateGPA = (subjects: Subject[]): number => {
  if (subjects.length === 0) return 0
  const total = subjects.reduce((sum, subject) => sum + subject.currentGrade, 0)
  return Math.round((total / subjects.length) * 10) / 10
}
