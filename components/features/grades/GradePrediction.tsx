"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Brain, AlertTriangle } from "lucide-react"
import GradeOverview from "./GradeOverview"
import SubjectCard from "./SubjectCard"
import { GradeService } from "@/services/gradeService"

export default function GradePrediction() {
  const [selectedSubject, setSelectedSubject] = useState("all")
  const subjects = GradeService.getSubjects()
  const overallStats = GradeService.calculateOverallStats(subjects)

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
      <GradeOverview stats={overallStats} />

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
          <SubjectCard key={subject.id} subject={subject} />
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
