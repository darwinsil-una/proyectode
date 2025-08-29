"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { MessageCircle, Smartphone, QrCode, CheckCircle, AlertCircle, Copy, Phone } from "lucide-react"

interface WhatsAppIntegrationProps {
  onConnect: (phoneNumber: string) => void
}

export default function WhatsAppIntegration({ onConnect }: WhatsAppIntegrationProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [autoResponses, setAutoResponses] = useState(true)
  const [copied, setCopied] = useState(false)

  const handleConnect = () => {
    if (phoneNumber) {
      onConnect(phoneNumber)
      setIsConnected(true)
      setShowQR(false)
    }
  }

  const handleShowQR = () => {
    setShowQR(true)
  }

  const copyBotNumber = () => {
    navigator.clipboard.writeText("+1 (555) 123-CLAUDE")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openWhatsApp = () => {
    // Detectar si es móvil para usar el esquema correcto
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const message = encodeURIComponent("Hola Claude, necesito ayuda con mis estudios")

    if (isMobile) {
      // En móvil, usar el esquema whatsapp://
      window.location.href = `whatsapp://send?phone=15551234567&text=${message}`
    } else {
      // En desktop, usar wa.me
      window.open(`https://wa.me/15551234567?text=${message}`, "_blank")
    }
  }

  return (
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-green-600" />
          WhatsApp - Claude 24/7
        </CardTitle>
        <CardDescription>
          Chatea con tu asistente académico directamente desde WhatsApp. Disponible las 24 horas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Opción principal - Conexión directa */}
              <div className="bg-white p-6 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Smartphone className="w-6 h-6 text-green-600" />
                  <h4 className="font-semibold">¡Empieza Ya!</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Toca el botón y comienza a chatear con Claude inmediatamente
                </p>
                <Button onClick={openWhatsApp} className="w-full bg-green-600 hover:bg-green-700 mb-4">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Abrir WhatsApp
                </Button>

                <div className="space-y-2">
                  <Label className="text-sm">O agrega este número:</Label>
                  <div className="flex gap-2">
                    <Input value="+1 (555) 123-CLAUDE" readOnly className="text-sm" />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyBotNumber}
                      className={copied ? "bg-green-50 border-green-300" : ""}
                    >
                      {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  {copied && <p className="text-xs text-green-600 text-center">¡Número copiado! Pégalo en WhatsApp</p>}
                </div>
              </div>

              {/* Opción secundaria - QR */}
              <div className="bg-white p-6 rounded-lg border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <QrCode className="w-6 h-6 text-green-600" />
                  <h4 className="font-semibold">Código QR</h4>
                </div>
                <p className="text-sm text-gray-600 mb-4">Escanea con la cámara de WhatsApp para conectar</p>
                {showQR ? (
                  <div className="text-center">
                    <div className="bg-gray-100 p-8 rounded-lg inline-block">
                      <QrCode className="w-20 h-20 text-gray-400" />
                      <p className="text-xs text-gray-500 mt-2">Escanea desde WhatsApp</p>
                    </div>
                  </div>
                ) : (
                  <Button variant="outline" onClick={handleShowQR} className="w-full bg-transparent">
                    <QrCode className="w-4 h-4 mr-2" />
                    Mostrar QR
                  </Button>
                )}
              </div>
            </div>

            {/* Sección de número personal - Opcional */}
            <div className="bg-white p-4 rounded-lg border border-green-200">
              <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4" />
                Tu número (opcional para notificaciones)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+52 55 1234 5678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Button onClick={handleConnect} disabled={!phoneNumber}>
                  Guardar
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Opcional: Para recibir recordatorios personalizados de tareas y exámenes
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h4 className="font-semibold text-green-800">¡Conectado exitosamente!</h4>
                <p className="text-sm text-green-700">Claude está listo para ayudarte en WhatsApp</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-3">⚙️ Configuración</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>🔔 Recordatorios automáticos</Label>
                    <p className="text-xs text-gray-500">Tareas, exámenes y fechas importantes</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>🤖 Respuestas inteligentes</Label>
                    <p className="text-xs text-gray-500">Claude responde automáticamente 24/7</p>
                  </div>
                  <Switch checked={autoResponses} onCheckedChange={setAutoResponses} />
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-3">🚀 ¿Qué puedes hacer?</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">📚 Resolver dudas</Badge>
                <Badge variant="secondary">📅 Planificar estudio</Badge>
                <Badge variant="secondary">🧠 Técnicas de memoria</Badge>
                <Badge variant="secondary">💡 Explicaciones simples</Badge>
                <Badge variant="secondary">📊 Seguimiento</Badge>
                <Badge variant="secondary">🎯 Motivación</Badge>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold mb-3">💬 Ejemplos de conversación:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-medium text-blue-600">Tú:</span>
                  <span>"Claude, explícame las derivadas"</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-green-600">Claude:</span>
                  <span>"¡Perfecto! Las derivadas miden velocidad de cambio. ¿Empezamos con un ejemplo sencillo?"</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-blue-600">Tú:</span>
                  <span>"Necesito motivación para estudiar"</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-green-600">Claude:</span>
                  <span>"¡Entiendo! Cada pequeño paso cuenta. ¿Qué tal si empezamos con 15 minutos? 💪"</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button onClick={openWhatsApp} className="bg-green-600 hover:bg-green-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Ir a WhatsApp
              </Button>
              <Button variant="outline" onClick={() => setIsConnected(false)}>
                Cambiar configuración
              </Button>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-800">
              <strong>100% Privado:</strong> Tus conversaciones son confidenciales. Claude está aquí para ayudarte a
              triunfar académicamente. 🎓
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
