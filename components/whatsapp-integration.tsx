"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { MessageCircle, Smartphone, QrCode, CheckCircle, AlertCircle, Copy, Phone } from "lucide-react"
import styles from "./whatsapp-integration.module.css"

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
    <Card className={styles.whatsappCard}>
      <CardHeader>
        <CardTitle className={styles.cardHeader}>
          <MessageCircle className="w-5 h-5 text-green-600" />
          WhatsApp - Claude 24/7
        </CardTitle>
        <CardDescription>
          Chatea con tu asistente académico directamente desde WhatsApp. Disponible las 24 horas.
        </CardDescription>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        {!isConnected ? (
          <div className={styles.connectionSection}>
            <div className={styles.connectionOptions}>
              {/* Opción principal - Conexión directa */}
              <div className={styles.optionCard}>
                <div className={styles.optionHeader}>
                  <Smartphone className="w-6 h-6 text-green-600" />
                  <h4 className={styles.optionTitle}>¡Empieza Ya!</h4>
                </div>
                <p className={styles.optionDescription}>Toca el botón y comienza a chatear con Claude inmediatamente</p>
                <Button onClick={openWhatsApp} className={styles.connectButton}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Abrir WhatsApp
                </Button>

                <div className={styles.botNumber}>
                  <Label>O agrega este número:</Label>
                  <div className={styles.numberContainer}>
                    <Input value="+1 (555) 123-CLAUDE" readOnly className={styles.numberInput} />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyBotNumber}
                      className={copied ? "bg-green-50 border-green-300" : ""}
                    >
                      {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-xs text-green-600 text-center mt-1">¡Número copiado! Pégalo en WhatsApp</p>
                  )}
                </div>
              </div>

              {/* Divider solo visible en desktop */}
              <div className={styles.divider}>
                <span>O</span>
              </div>

              {/* Opción secundaria - QR */}
              <div className={styles.optionCard}>
                <div className={styles.optionHeader}>
                  <QrCode className="w-6 h-6 text-green-600" />
                  <h4 className={styles.optionTitle}>Código QR</h4>
                </div>
                <p className={styles.optionDescription}>Escanea con la cámara de WhatsApp para conectar</p>
                {showQR ? (
                  <div className={styles.qrContainer}>
                    <div className={styles.qrCode}>
                      <QrCode className="w-20 h-20 text-gray-400" />
                      <p className="text-xs text-gray-500 mt-2">Escanea desde WhatsApp</p>
                    </div>
                  </div>
                ) : (
                  <Button variant="outline" onClick={handleShowQR} className={styles.qrButton}>
                    <QrCode className="w-4 h-4 mr-2" />
                    Mostrar QR
                  </Button>
                )}
              </div>
            </div>

            {/* Sección de número personal - Opcional */}
            <div className={styles.phoneSection}>
              <Label htmlFor="phone">
                <Phone className="w-4 h-4 inline mr-1" />
                Tu número (opcional para notificaciones)
              </Label>
              <div className={styles.phoneInput}>
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
              <p className={styles.phoneNote}>
                💡 Opcional: Para recibir recordatorios personalizados de tareas y exámenes
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.connectedSection}>
            <div className={styles.statusIndicator}>
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h4 className={styles.statusTitle}>¡Conectado exitosamente!</h4>
                <p className={styles.statusDescription}>Claude está listo para ayudarte en WhatsApp</p>
              </div>
            </div>

            <div className={styles.settingsSection}>
              <h4 className={styles.settingsTitle}>⚙️ Configuración</h4>
              <div className={styles.settingsList}>
                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <Label>🔔 Recordatorios automáticos</Label>
                    <p className={styles.settingDescription}>Tareas, exámenes y fechas importantes</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className={styles.settingItem}>
                  <div className={styles.settingInfo}>
                    <Label>🤖 Respuestas inteligentes</Label>
                    <p className={styles.settingDescription}>Claude responde automáticamente 24/7</p>
                  </div>
                  <Switch checked={autoResponses} onCheckedChange={setAutoResponses} />
                </div>
              </div>
            </div>

            <div className={styles.featuresSection}>
              <h4 className={styles.featuresTitle}>🚀 ¿Qué puedes hacer?</h4>
              <div className={styles.featuresList}>
                <Badge variant="secondary" className={styles.featureBadge}>
                  📚 Resolver dudas
                </Badge>
                <Badge variant="secondary" className={styles.featureBadge}>
                  📅 Planificar estudio
                </Badge>
                <Badge variant="secondary" className={styles.featureBadge}>
                  🧠 Técnicas de memoria
                </Badge>
                <Badge variant="secondary" className={styles.featureBadge}>
                  💡 Explicaciones simples
                </Badge>
                <Badge variant="secondary" className={styles.featureBadge}>
                  📊 Seguimiento
                </Badge>
                <Badge variant="secondary" className={styles.featureBadge}>
                  🎯 Motivación
                </Badge>
              </div>
            </div>

            <div className={styles.exampleSection}>
              <h4 className={styles.exampleTitle}>💬 Ejemplos de conversación:</h4>
              <div className={styles.examplesList}>
                <div className={styles.exampleItem}>
                  <span className={styles.exampleLabel}>Tú:</span>
                  <span className={styles.exampleText}>"Claude, explícame las derivadas"</span>
                </div>
                <div className={styles.exampleItem}>
                  <span className={styles.exampleLabel}>Claude:</span>
                  <span className={styles.exampleText}>
                    "¡Perfecto! Las derivadas miden velocidad de cambio. ¿Empezamos con un ejemplo sencillo?"
                  </span>
                </div>
                <div className={styles.exampleItem}>
                  <span className={styles.exampleLabel}>Tú:</span>
                  <span className={styles.exampleText}>"Necesito motivación para estudiar"</span>
                </div>
                <div className={styles.exampleItem}>
                  <span className={styles.exampleLabel}>Claude:</span>
                  <span className={styles.exampleText}>
                    "¡Entiendo! Cada pequeño paso cuenta. ¿Qué tal si empezamos con 15 minutos? 💪"
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button onClick={openWhatsApp} className={styles.connectButton}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Ir a WhatsApp
              </Button>
              <Button variant="outline" onClick={() => setIsConnected(false)} className={styles.disconnectButton}>
                Cambiar configuración
              </Button>
            </div>
          </div>
        )}

        <div className={styles.infoSection}>
          <div className={styles.infoItem}>
            <AlertCircle className="w-4 h-4 text-blue-600" />
            <p className={styles.infoText}>
              <strong>100% Privado:</strong> Tus conversaciones son confidenciales. Claude está aquí para ayudarte a
              triunfar académicamente. 🎓
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
