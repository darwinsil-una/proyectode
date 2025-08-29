import type { Subject } from "@/types"

export class GradeService {
  static getSubjects(): Subject[] {
    return [
      {
        id: "math",
        name: "Matemáticas III",
        currentGrade: 8.5,
        predictedFinal: 8.7,
        trend: "up",
        risk: "low",
        confidence: 92,
        nextExam: "2024-01-20",
        recommendations: [
          "Continúa con tu ritmo actual de estudio",
          "Practica más ejercicios de integrales",
          "Revisa los temas de la clase del viernes",
        ],
        progress: {
          assignments: 85,
          participation: 90,
          exams: 82,
        },
      },
      {
        id: "physics",
        name: "Física II",
        currentGrade: 7.2,
        predictedFinal: 6.8,
        trend: "down",
        risk: "medium",
        confidence: 78,
        nextExam: "2024-01-18",
        recommendations: [
          "Dedica más tiempo a resolver problemas prácticos",
          "Únete al grupo de estudio de Física",
          "Consulta con el profesor sobre temas difíciles",
          "Repasa los conceptos de mecánica cuántica",
        ],
        progress: {
          assignments: 70,
          participation: 65,
          exams: 75,
        },
      },
      {
        id: "chemistry",
        name: "Química Orgánica",
        currentGrade: 9.1,
        predictedFinal: 9.3,
        trend: "up",
        risk: "low",
        confidence: 95,
        nextExam: "2024-01-22",
        recommendations: [
          "Excelente trabajo, mantén el nivel",
          "Ayuda a compañeros que necesiten apoyo",
          "Considera tomar cursos avanzados",
        ],
        progress: {
          assignments: 95,
          participation: 98,
          exams: 92,
        },
      },
      {
        id: "history",
        name: "Historia Contemporánea",
        currentGrade: 6.8,
        predictedFinal: 6.5,
        trend: "down",
        risk: "high",
        confidence: 85,
        nextExam: "2024-01-16",
        recommendations: [
          "URGENTE: Mejora tu participación en clase",
          "Entrega todas las tareas pendientes",
          "Programa sesiones de estudio adicionales",
          "Considera tutoría personalizada",
        ],
        progress: {
          assignments: 60,
          participation: 55,
          exams: 70,
        },
      },
    ]
  }

  static calculateOverallStats(subjects: Subject[]) {
    const currentGPA = subjects.reduce((sum, s) => sum + s.currentGrade, 0) / subjects.length
    const predictedGPA = subjects.reduce((sum, s) => sum + s.predictedFinal, 0) / subjects.length
    const atRiskSubjects = subjects.filter((s) => s.risk === "high" || s.risk === "medium").length
    const improvingSubjects = subjects.filter((s) => s.trend === "up").length

    return {
      currentGPA: Math.round(currentGPA * 10) / 10,
      predictedGPA: Math.round(predictedGPA * 10) / 10,
      totalSubjects: subjects.length,
      atRiskSubjects,
      improvingSubjects,
    }
  }
}
