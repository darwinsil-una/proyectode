"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Brain, Send, MessageSquare } from "lucide-react"
import styles from "./ai-assistant.module.css"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface ChatInterfaceProps {
  messages: Message[]
  input: string
  isLoading: boolean
  onInputChange: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export default function ChatInterface({ messages, input, isLoading, onInputChange, onSubmit }: ChatInterfaceProps) {
  return (
    <Card className={styles.chatCard}>
      <CardHeader>
        <CardTitle className={styles.chatHeader}>
          <MessageSquare className="w-5 h-5" />
          Conversación con Claude
        </CardTitle>
        <CardDescription>Haz preguntas, pide ayuda o simplemente conversa sobre tus estudios</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className={styles.messagesArea}>
          <div className={styles.messagesContainer}>
            {messages.map((message) => (
              <div key={message.id} className={`${styles.messageWrapper} ${message.role}`}>
                <div className={`${styles.message} ${message.role}`}>
                  <div className={styles.messageHeader}>
                    {message.role === "assistant" && <Brain className="w-4 h-4 text-red-600" />}
                    <span className={styles.messageRole}>{message.role === "user" ? "Tú" : "Claude"}</span>
                  </div>
                  <p className={styles.messageContent}>{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className={styles.loadingMessage}>
                <div className={styles.loadingContent}>
                  <div className={styles.loadingHeader}>
                    <Brain className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Claude está escribiendo...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <form onSubmit={onSubmit} className={styles.inputForm}>
          <Input
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            disabled={isLoading}
            className={styles.inputField}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
