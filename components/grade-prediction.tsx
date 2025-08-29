"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Target,
  BarChart3,
  BookOpen,
  Award,
  Brain,
} from "lucide-react"

export default function GradePrediction() {
  const [selectedSubject, setSelectedSubject] = useState("all")

  const subjects = [
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

  const overallStats = {
    currentGPA: 7.9,
    predictedGPA: 7.8,
    totalSubjects: subjects.length,
    atRiskSubjects: subjects.filter((s) => s.risk === "high" || s.risk === "medium").length,
    improvingSubjects: subjects.filter((s) => s.trend === "up").length,
  }

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="w-4 h-4 text-red-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-rose-600" />
    )
  }

  const getRiskColor = (risk: string) => {
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

  const getRiskLabel = (risk: string) => {
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

  const filteredSubjects = selectedSubject === "all" ? subjects : subjects.filter((s) => s.id === selectedSubject)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Sistema de Predicción de Calificaciones</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Análisis inteligente de tu rendimiento académico con predicciones precisas y recomendaciones personalizadas
          para mejorar tus calificaciones.
        </p>
      </div>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{overallStats.currentGPA}</div>
            <div className="text-sm text-gray-600">GPA Actual</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-rose-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{overallStats.predictedGPA}</div>
            <div className="text-sm text-gray-600">GPA Predicho</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{overallStats.totalSubjects}</div>
            <div className="text-sm text-gray-600">Materias</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{overallStats.atRiskSubjects}</div>
            <div className="text-sm text-gray-600">En Riesgo</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold">{overallStats.improvingSubjects}</div>
            <div className="text-sm text-gray-600">Mejorando</div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSubject === "all" ? "default" : "outline"}
              onClick={() => setSelectedSubject("all")}
              size="sm"
            >
              Todas las Materias
            </Button>
            {subjects.map((subject) => (
              <Button
                key={subject.id}
                variant={selectedSubject === subject.id ? "default" : "outline"}
                onClick={() => setSelectedSubject(subject.id)}
                size="sm"
              >
                {subject.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subjects Analysis */}
      <div className="space-y-6">
        {filteredSubjects.map((subject) => (
          <Card key={subject.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {subject.name}
                    {getTrendIcon(subject.trend)}
                  </CardTitle>
                  <CardDescription>
                    Próximo examen: {new Date(subject.nextExam).toLocaleDateString("es-ES")}
                  </CardDescription>
                </div>
                <Badge className={getRiskColor(subject.risk)}>{getRiskLabel(subject.risk)}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Resumen</TabsTrigger>
                  <TabsTrigger value="progress">Progreso</TabsTrigger>
                  <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Current Grade */}
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">{subject.currentGrade}</div>
                      <div className="text-sm text-gray-600">Calificación Actual</div>
                    </div>

                    {/* Predicted Grade */}
                    <div className="text-center">
                      <div
                        className={`text-3xl font-bold mb-1 ${
                          subject.predictedFinal > subject.currentGrade ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {subject.predictedFinal}
                      </div>
                      <div className="text-sm text-gray-600">Predicción Final</div>
                    </div>

                    {/* Confidence */}
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">{subject.confidence}%</div>
                      <div className="text-sm text-gray-600">Confianza</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progreso hacia la meta</span>
                      <span>{Math.round((subject.currentGrade / 10) * 100)}%</span>
                    </div>
                    <Progress value={(subject.currentGrade / 10) * 100} className="h-2" />
                  </div>
                </TabsContent>

                <TabsContent value="progress" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Tareas</span>
                          <span className="text-sm text-gray-600">{subject.progress.assignments}%</span>
                        </div>
                        <Progress value={subject.progress.assignments} className="h-2" />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Participación</span>
                          <span className="text-sm text-gray-600">{subject.progress.participation}%</span>
                        </div>
                        <Progress value={subject.progress.participation} className="h-2" />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Exámenes</span>
                          <span className="text-sm text-gray-600">{subject.progress.exams}%</span>
                        </div>
                        <Progress value={subject.progress.exams} className="h-2" />
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Análisis de Tendencias
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Tendencia general:</span>
                          <span className={`font-medium ${subject.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                            {subject.trend === "up" ? "Mejorando" : "Declinando"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Consistencia:</span>
                          <span className="font-medium text-blue-600">
                            {subject.confidence > 90 ? "Alta" : subject.confidence > 70 ? "Media" : "Baja"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Próxima evaluación:</span>
                          <span className="font-medium">
                            {Math.ceil(
                              (new Date(subject.nextExam).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                            )}{" "}
                            días
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        Recomendaciones Personalizadas
                      </h4>
                      <div className="space-y-3">
                        {subject.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                subject.risk === "high"
                                  ? "bg-red-500"
                                  : subject.risk === "medium"
                                    ? "bg-orange-500"
                                    : "bg-green-500"
                              }`}
                            ></div>
                            <div className="flex-1">
                              <p className="text-sm">{rec}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {subject.risk === "high" && (
                    <Card className="border-red-200 bg-red-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <h4 className="font-semibold text-red-800">Alerta de Riesgo Académico</h4>
                        </div>
                        <p className="text-sm text-red-700 mb-3">
                          Esta materia requiere atención inmediata para evitar reprobar.
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="destructive">
                            Solicitar Tutoría
                          </Button>
                          <Button size="sm" variant="outline">
                            Hablar con Profesor
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-red-50 to-rose-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-red-600" />
            Insights de IA
          </CardTitle>
          <CardDescription>Análisis inteligente basado en tu patrón de estudio y rendimiento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Fortalezas Identificadas</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm">Excelente en materias prácticas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm">Consistencia en entregas de tareas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm">Mejora continua en Química</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Áreas de Mejora</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span className="text-sm">Participación en clases teóricas</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span className="text-sm">Gestión del tiempo en exámenes</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span className="text-sm">Comprensión de conceptos históricos</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg border">
            <h4 className="font-semibold mb-2">Recomendación Principal</h4>
            <p className="text-sm text-gray-700">
              Basándome en tu patrón de rendimiento, te sugiero enfocar el 60% de tu tiempo de estudio en Historia
              Contemporánea durante las próximas dos semanas, mientras mantienes un repaso ligero en las demás materias.
              Esto podría mejorar tu GPA general en 0.3 puntos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
