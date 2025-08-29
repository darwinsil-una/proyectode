export const ACADEMIC_INTERESTS = [
  "Programación",
  "Ciencias",
  "Historia",
  "Física",
  "Matemáticas",
  "Literatura",
  "Arte",
  "Deportes",
  "Música",
  "Idiomas",
  "Química",
  "Biología",
] as const

export const SUBJECTS = [
  "Matemáticas",
  "Física",
  "Química",
  "Historia",
  "Literatura",
  "Informática",
  "Inglés",
  "Filosofía",
  "Biología",
  "Economía",
] as const

export const INSTITUTIONS = [
  { value: "unam", label: "Universidad Nacional Autónoma de México" },
  { value: "ipn", label: "Instituto Politécnico Nacional" },
  { value: "itesm", label: "Tecnológico de Monterrey" },
  { value: "uag", label: "Universidad Autónoma de Guadalajara" },
  { value: "other", label: "Otra institución" },
] as const

export const ACADEMIC_PROGRAMS = [
  { value: "ingenieria-sistemas", label: "Ingeniería en Sistemas" },
  { value: "medicina", label: "Medicina" },
  { value: "derecho", label: "Derecho" },
  { value: "psicologia", label: "Psicología" },
  { value: "administracion", label: "Administración" },
  { value: "arquitectura", label: "Arquitectura" },
  { value: "other", label: "Otra carrera" },
] as const

export const PRIORITY_COLORS = {
  high: "bg-red-500 text-white",
  medium: "bg-rose-400 text-white",
  low: "bg-red-200 text-red-800",
} as const

export const RISK_COLORS = {
  low: "text-red-600 bg-red-50 border-red-200",
  medium: "text-rose-600 bg-rose-50 border-rose-200",
  high: "text-red-800 bg-red-100 border-red-300",
} as const
