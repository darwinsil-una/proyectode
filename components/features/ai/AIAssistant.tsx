"use client"

import type React from "react"
import { useState } from "react"
import { Brain, Calendar, BookOpen, Heart, TrendingUp, Target, Clock } from "lucide-react"
import AIFeatures from "./AIFeatures"
import ChatInterface from "./ChatInterface"
import QuickActions from "./QuickActions"
import WhatsAppIntegration from "./WhatsAppIntegration"
import AIStatistics from "./AIStatistics"
import type { AIMessage, AIFeature } from "@/types"

export default function AIAssistant() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "¡Hola! Soy Claude, tu asistente académico personal. Estoy aquí para ayudarte con planificación de estudios, apoyo emocional, moderación de discusiones y recomendaciones personalizadas. ¿En qué puedo ayudarte hoy?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const features: AIFeature[] = [
    {
      id: "planning",
      title: "Planificación Automática",
      description: "Organiza tu horario de estudios de manera inteligente",
      icon: Calendar,
      color: "bg-red-500",
      prompt:
        "Ayúdame a crear un plan de estudios para esta semana. Tengo parciales de Matemáticas el viernes y un ensayo de Historia para el lunes próximo.",
    },
    {
      id: "study-help",
      title: "Apoyo en Estudios",
      description: "Resuelve dudas y explica conceptos complejos",
      icon: BookOpen,
      color: "bg-rose-500",
      prompt: "Explícame el concepto de derivadas en cálculo de una manera simple y con ejemplos prácticos.",
    },
    {
      id: "emotional",
      title: "Apoyo Emocional",
      description: "Conversación empática y motivacional",
      icon: Heart,
      color: "bg-red-400",
      prompt:
        "Me siento muy estresado con todos los exámenes que tengo esta semana. ¿Puedes ayudarme a manejar la ansiedad?",
    },
    {
      id: "recommendations",
      title: "Recomendaciones Personalizadas",
      description: "Sugerencias basadas en tu rendimiento",
      icon: TrendingUp,
      color: "bg-rose-600",
      prompt:
        "Basándote en mi rendimiento actual (promedio 8.5), ¿qué estrategias me recomiendas para mejorar en Física?",
    },
  ]

  const quickActions = [
    {
      title: "Crear horario de estudio",
      prompt: "Ayúdame a crear un horario de estudio equilibrado para esta semana",
    },
    {
      title: "Técnicas de memorización",
      prompt: "¿Qué técnicas de memorización me recomiendas para estudiar Historia?",
    },
    {
      title: "Motivación para estudiar",
      prompt: "Necesito motivación para seguir estudiando, me siento desanimado",
    },
    {
      title: "Preparación para exámenes",
      prompt: "Dame consejos para prepararme efectivamente para los exámenes finales",
    },
  ]

  const statistics = [
    {
      icon: Target,
      value: "127",
      label: "Consultas Resueltas",
      color: "text-red-600",
    },
    {
      icon: Clock,
      value: "24/7",
      label: "Disponibilidad",
      color: "text-rose-600",
    },
    {
      icon: BookOpen,
      value: "15",
      label: "Materias Cubiertas",
      color: "text-red-500",
    },
    {
      icon: Heart,
      value: "98%",
      label: "Satisfacción",
      color: "text-rose-500",
    },
  ]

  const handleFeatureClick = (feature: AIFeature) => {
    setSelectedFeature(feature.id)
    setInput(feature.prompt)
  }

  const handleQuickAction = (prompt: string) => {
    setInput(prompt)
  }

  const handleWhatsAppConnect = (phoneNumber: string) => {
    console.log("Connecting WhatsApp for:", phoneNumber)
    // Aquí implementarías la lógica de conexión con WhatsApp
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: AIMessage = { id: Date.now().toString(), role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simular respuesta de IA
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Entiendo tu consulta sobre "${userMessage.content}". Como tu asistente académico, te recomiendo lo siguiente:\n\n1. Organiza tu tiempo de estudio en bloques de 25-30 minutos\n2. Toma descansos regulares para mantener la concentración\n3. Utiliza técnicas de estudio activo como resúmenes y mapas mentales\n\n¿Te gustaría que profundice en algún punto específico?`,
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-red-600 to-rose-600 p-3 rounded-xl">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold">Claude - Asistente IA</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tu compañero inteligente para el éxito académico. Obtén ayuda personalizada, planificación automática y apoyo
          emocional las 24 horas del día.
        </p>
      </div>

      {/* Features Grid */}
      <AIFeatures features={features} selectedFeature={selectedFeature} onFeatureClick={handleFeatureClick} />

      {/* WhatsApp Integration */}
      <WhatsAppIntegration onConnect={handleWhatsAppConnect} />

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChatInterface
            messages={messages}
            input={input}
            isLoading={isLoading}
            onInputChange={setInput}
            onSubmit={handleSubmit}
          />
        </div>

        <div>
          <QuickActions actions={quickActions} onActionClick={handleQuickAction} />
        </div>
      </div>

      {/* Statistics */}
      <AIStatistics statistics={statistics} />
    </div>
  )
}
