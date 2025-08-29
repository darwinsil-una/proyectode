"use client"

import StatCard from "@/components/shared/StatCard"
import { Award, Target, BookOpen, AlertTriangle, TrendingUp } from "lucide-react"

interface GradeOverviewProps {
  stats: {
    currentGPA: number
    predictedGPA: number
    totalSubjects: number
    atRiskSubjects: number
    improvingSubjects: number
  }
}

export default function GradeOverview({ stats }: GradeOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <StatCard icon={Award} value={stats.currentGPA} label="GPA Actual" color="text-red-600" />
      <StatCard icon={Target} value={stats.predictedGPA} label="GPA Predicho" color="text-rose-600" />
      <StatCard icon={BookOpen} value={stats.totalSubjects} label="Materias" color="text-red-500" />
      <StatCard icon={AlertTriangle} value={stats.atRiskSubjects} label="En Riesgo" color="text-rose-500" />
      <StatCard icon={TrendingUp} value={stats.improvingSubjects} label="Mejorando" color="text-red-600" />
    </div>
  )
}
