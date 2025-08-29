"use client"

import { Card, CardContent } from "@/components/ui/card"
import styles from "./ai-assistant.module.css"

interface Statistic {
  icon: any
  value: string
  label: string
  color: string
}

interface AIStatisticsProps {
  statistics: Statistic[]
}

export default function AIStatistics({ statistics }: AIStatisticsProps) {
  return (
    <div className={styles.statsGrid}>
      {statistics.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <Card key={index}>
            <CardContent className={styles.statCard}>
              <IconComponent className={`${styles.statIcon} ${stat.color}`} />
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
