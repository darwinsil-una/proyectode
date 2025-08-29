"use client"

import type React from "react"

import { useState } from "react"
import { Brain } from "lucide-react"
import { Calendar, BookOpen, Heart, TrendingUp, Target, Clock } from "lucide-react"

// Import components
import AIFeatures from "./ai-features"
import ChatInterface from "./chat-interface"
import QuickActions from "./quick-actions"
import WhatsAppIntegration from "./whatsapp-integration"
import AIStatistics from "./ai-statistics"
import styles from "./ai-assistant.module.css"

export default function AIAssistant() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  type Message = {
    id: string
    role: "assistant" | "user"
    content: string
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "¡Hola! Soy Claude, tu asistente académico personal. Estoy aquí para ayudarte con planificación de estudios, apoyo emocional, moderación de discusiones y recomendaciones personalizadas. ¿En qué puedo ayudarte hoy?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const features = [
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

  const handleFeatureClick = (feature: any) => {
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

    const userMessage = { id: Date.now().toString(), role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simular respuesta de IA
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: `Entiendo tu consulta sobre "${userMessage.content}". Como tu asistente académico, te recomiendo lo siguiente:\n\n1. Organiza tu tiempo de estudio en bloques de 25-30 minutos\n2. Toma descansos regulares para mantener la concentración\n3. Utiliza técnicas de estudio activo como resúmenes y mapas mentales\n\n¿Te gustaría que profundice en algún punto específico?`,
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <div className={styles.iconContainer}>
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h2 className={styles.title}>Claude - Asistente IA</h2>
        </div>
        <p className={styles.description}>
          Tu compañero inteligente para el éxito académico. Obtén ayuda personalizada, planificación automática y apoyo
          emocional las 24 horas del día.
        </p>
      </div>

      {/* Features Grid */}
      <AIFeatures features={features} selectedFeature={selectedFeature} onFeatureClick={handleFeatureClick} />

      {/* WhatsApp Integration */}
      <WhatsAppIntegration onConnect={handleWhatsAppConnect} />

      {/* Chat Interface */}
      <div className={styles.chatGrid}>
        <ChatInterface
          messages={messages}
          input={input}
          isLoading={isLoading}
          onInputChange={setInput}
          onSubmit={handleSubmit}
        />

        <QuickActions actions={quickActions} onActionClick={handleQuickAction} />
      </div>

      {/* Statistics */}
      <AIStatistics statistics={statistics} />
    </div>
  )
}
