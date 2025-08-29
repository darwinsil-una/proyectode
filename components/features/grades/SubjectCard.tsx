"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, AlertTriangle, BarChart3, Brain } from "lucide-react"
import { getRiskColor, getRiskLabel } from "@/lib/utils/grade"
import type { Subject } from "@/types"

interface SubjectCardProps {
  subject: Subject
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="w-4 h-4 text-red-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-rose-600" />
    )
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              {subject.name}
              {getTrendIcon(subject.trend)}
            </CardTitle>
            <p className="text-sm text-gray-600">
              Próximo examen: {new Date(subject.nextExam).toLocaleDateString("es-ES")}
            </p>
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
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{subject.currentGrade}</div>
                <div className="text-sm text-gray-600">Calificación Actual</div>
              </div>
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
                      {Math.ceil((new Date(subject.nextExam).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
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
  )
}
