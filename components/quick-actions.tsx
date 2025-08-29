"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb } from "lucide-react"
import styles from "./ai-assistant.module.css"

interface QuickAction {
  title: string
  prompt: string
}

interface QuickActionsProps {
  actions: QuickAction[]
  onActionClick: (prompt: string) => void
}

export default function QuickActions({ actions, onActionClick }: QuickActionsProps) {
  return (
    <Card className={styles.sidebar}>
      <CardHeader>
        <CardTitle className={styles.chatHeader}>
          <Lightbulb className="w-5 h-5" />
          Acciones Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent className={styles.sidebarContent}>
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className={styles.quickActionButton}
            onClick={() => onActionClick(action.prompt)}
          >
            <div className={styles.quickActionContent}>
              <div className={styles.quickActionTitle}>{action.title}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
