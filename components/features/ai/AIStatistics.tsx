"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface Statistic {
  icon: LucideIcon
  value: string
  label: string
  color: string
}

interface AIStatisticsProps {
  statistics: Statistic[]
}

export default function AIStatistics({ statistics }: AIStatisticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statistics.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <Card key={index}>
            <CardContent className="p-6 text-center">
              <IconComponent className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
