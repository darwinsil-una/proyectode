"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb } from "lucide-react"

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
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5" />
          Acciones Rápidas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full justify-start text-left h-auto p-3 bg-transparent"
            onClick={() => onActionClick(action.prompt)}
          >
            <div className="text-sm font-medium">{action.title}</div>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
