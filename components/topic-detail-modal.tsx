"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, MessageCircle, Crown } from "lucide-react"
import styles from "./topic-detail-modal.module.css"

interface Reply {
  id: number
  content: string
  author: string
  authorAvatar: string
  createdAt: string
}

interface ForumTopic {
  id: number
  title: string
  content: string
  author: string
  authorAvatar: string
  subject: string
  replies: Reply[]
  views: number
  likes: number
  isHot: boolean
  isPinned: boolean
  lastActivity: string
  createdAt: string
  tags: string[]
}

interface TopicDetailModalProps {
  isOpen: boolean
  onClose: () => void
  topic: ForumTopic
  onAddReply: (topicId: number, reply: string) => void
}

export default function TopicDetailModal({ isOpen, onClose, topic, onAddReply }: TopicDetailModalProps) {
  const [newReply, setNewReply] = useState("")

  const handleSubmitReply = () => {
    if (newReply.trim()) {
      onAddReply(topic.id, newReply)
      setNewReply("")
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBackdrop} onClick={onClose} />
      <div className={styles.modalContent}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerContent}>
            <div className={styles.topicTitle}>
              {topic.isPinned && <Crown className="w-5 h-5 text-red-600" />}
              <h2 className={styles.title}>{topic.title}</h2>
              {topic.isHot && (
                <Badge variant="destructive" className={styles.hotBadge}>
                  🔥 Popular
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className={styles.topicMeta}>
            <div className={styles.authorInfo}>
              <Avatar className="w-8 h-8">
                <AvatarImage src={topic.authorAvatar || "/placeholder.svg"} alt={topic.author} />
                <AvatarFallback>
                  {topic.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="font-medium">{topic.author}</span>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Badge variant="outline">{topic.subject}</Badge>
                  <span>{new Date(topic.createdAt).toLocaleDateString("es-ES")}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.topicTags}>
            {topic.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className={styles.modalBody}>
          {/* Original Topic Content */}
          <div className={styles.originalPost}>
            <p className={styles.topicContent}>{topic.content}</p>
          </div>

          {/* Replies Section */}
          <div className={styles.repliesSection}>
            <div className={styles.repliesHeader}>
              <h3 className="font-semibold flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Respuestas ({topic.replies.length})
              </h3>
            </div>

            <ScrollArea className={styles.repliesContainer}>
              {topic.replies.length === 0 ? (
                <div className={styles.noReplies}>
                  <MessageCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500 text-center">Aún no hay respuestas. ¡Sé el primero en responder!</p>
                </div>
              ) : (
                <div className={styles.repliesList}>
                  {topic.replies.map((reply) => (
                    <div key={reply.id} className={styles.replyItem}>
                      <div className={styles.replyHeader}>
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={reply.authorAvatar || "/placeholder.svg"} alt={reply.author} />
                          <AvatarFallback>
                            {reply.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className={styles.replyMeta}>
                          <span className="font-medium text-sm">{reply.author}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(reply.createdAt).toLocaleDateString("es-ES")}
                          </span>
                        </div>
                      </div>
                      <div className={styles.replyContent}>
                        <p className="text-sm">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>

        {/* Reply Input */}
        <div className={styles.replyInput}>
          <div className={styles.inputContainer}>
            <Textarea
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              placeholder="Escribe tu respuesta..."
              className="min-h-[80px] resize-none"
            />
            <div className={styles.inputActions}>
              <Button onClick={handleSubmitReply} disabled={!newReply.trim()} className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Responder
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
