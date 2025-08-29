"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  X,
  MoreHorizontal,
  Send,
  Paperclip,
  ImageIcon,
  Smile,
  Clock,
  CheckCircle2,
  CheckCheck,
  MessageSquare,
} from "lucide-react"
import styles from "./messaging-panel.module.css"

interface Message {
  id: number
  content: string
  senderId: number
  senderName: string
  senderAvatar: string
  timestamp: string
  type: "text" | "image" | "file" | "audio" | "video"
  status: "sending" | "sent" | "delivered" | "read"
}

interface Conversation {
  id: number
  participantId: number
  participantName: string
  participantAvatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
  isTyping: boolean
  messages: Message[]
}

interface MessagingPanelProps {
  isOpen: boolean
  onClose: () => void
  conversations: Conversation[]
  selectedConversation: Conversation | null
  onSelectConversation: (conversation: Conversation) => void
  onSendMessage: (message: string) => void
}

export default function MessagingPanel({
  isOpen,
  onClose,
  conversations,
  selectedConversation,
  onSelectConversation,
  onSendMessage,
}: MessagingPanelProps) {
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selectedConversation?.messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage)
      setNewMessage("")
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.panelOverlay}>
      <div className={styles.panelBackdrop} onClick={onClose} />
      <div className={styles.panelContent}>
        {/* Lista de conversaciones */}
        <div className={styles.conversationList}>
          <div className={styles.conversationHeader}>
            <div className={styles.headerContent}>
              <h3 className={styles.panelTitle}>Mensajes</h3>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className={styles.searchContainer}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Buscar conversaciones..." className="pl-10" />
            </div>
          </div>
          <div className={styles.conversationItems}>
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`${styles.conversationItem} ${selectedConversation?.id === conv.id ? styles.selected : ""}`}
                onClick={() => onSelectConversation(conv)}
              >
                <div className={styles.conversationContent}>
                  <div className={styles.avatarContainer}>
                    <Avatar>
                      <AvatarImage src={conv.participantAvatar || "/placeholder.svg"} alt={conv.participantName} />
                      <AvatarFallback>
                        {conv.participantName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conv.isOnline && <div className={styles.onlineIndicator} />}
                  </div>
                  <div className={styles.conversationInfo}>
                    <div className={styles.conversationMeta}>
                      <h4 className={styles.participantName}>{conv.participantName}</h4>
                      <span className={styles.messageTime}>{conv.lastMessageTime}</span>
                    </div>
                    <div className={styles.lastMessageContainer}>
                      <p className={styles.lastMessage}>{conv.isTyping ? "Escribiendo..." : conv.lastMessage}</p>
                      {conv.unreadCount > 0 && <span className={styles.unreadBadge}>{conv.unreadCount}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat activo */}
        <div className={styles.chatContainer}>
          {selectedConversation ? (
            <>
              {/* Header del chat */}
              <div className={styles.chatHeader}>
                <div className={styles.chatHeaderContent}>
                  <div className={styles.chatParticipant}>
                    <div className={styles.avatarContainer}>
                      <Avatar>
                        <AvatarImage
                          src={selectedConversation.participantAvatar || "/placeholder.svg"}
                          alt={selectedConversation.participantName}
                        />
                        <AvatarFallback>
                          {selectedConversation.participantName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {selectedConversation.isOnline && <div className={styles.onlineIndicator} />}
                    </div>
                    <div>
                      <h4 className={styles.participantName}>{selectedConversation.participantName}</h4>
                      <p className={styles.participantStatus}>
                        {selectedConversation.isOnline ? "En línea" : "Desconectado"}
                      </p>
                    </div>
                  </div>
                  <div className={styles.chatActions}>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mensajes */}
              <div className={styles.messagesContainer}>
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${styles.messageWrapper} ${message.senderId === 1 ? styles.sent : styles.received}`}
                  >
                    <div className={styles.messageContent}>
                      <div
                        className={`${styles.messageBubble} ${
                          message.senderId === 1 ? styles.sentBubble : styles.receivedBubble
                        }`}
                      >
                        <p className={styles.messageText}>{message.content}</p>
                      </div>
                      <div
                        className={`${styles.messageInfo} ${
                          message.senderId === 1 ? styles.sentInfo : styles.receivedInfo
                        }`}
                      >
                        <span className={styles.messageTime}>
                          {new Date(message.timestamp).toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {message.senderId === 1 && (
                          <div className={styles.messageStatus}>
                            {message.status === "sending" && <Clock className="w-3 h-3" />}
                            {message.status === "sent" && <CheckCircle2 className="w-3 h-3" />}
                            {message.status === "delivered" && <CheckCheck className="w-3 h-3" />}
                            {message.status === "read" && <CheckCheck className="w-3 h-3 text-blue-500" />}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input de mensaje */}
              <div className={styles.messageInput}>
                <div className={styles.inputContainer}>
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <div className={styles.textInputContainer}>
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Escribe un mensaje..."
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                    />
                  </div>
                  <Button variant="ghost" size="sm">
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.emptyChatState}>
              <div className={styles.emptyChatContent}>
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Selecciona una conversación</h3>
                <p className="text-gray-500">Elige una conversación para comenzar a chatear</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
