"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, MoreHorizontal, Crown, MessageCircle } from "lucide-react"
import styles from "./forum.module.css"

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

interface ForumProps {
  topics: ForumTopic[]
  onSelectTopic: (topic: ForumTopic) => void
  onLikeTopic: (topicId: number) => void
  onCreateTopic: () => void
}

export default function Forum({ topics, onSelectTopic, onLikeTopic, onCreateTopic }: ForumProps) {
  if (topics.length === 0) {
    return (
      <Card>
        <CardContent className={styles.emptyState}>
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron temas</h3>
          <p className="text-gray-500 mb-4">Ajusta los filtros o crea un nuevo tema de discusión</p>
          <Button onClick={onCreateTopic}>Crear Nuevo Tema</Button>
        </CardContent>
      </Card>
    )
  }

  const sortedTopics = topics.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    if (a.isHot && !b.isHot) return -1
    if (!a.isHot && b.isHot) return 1
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className={styles.forumContainer}>
      {sortedTopics.map((topic) => (
        <Card key={topic.id} className={styles.topicCard}>
          <CardContent className={styles.topicContent}>
            <div className={styles.topicHeader}>
              <div className={styles.topicInfo}>
                <div className={styles.topicTitle}>
                  {topic.isPinned && <Crown className="w-4 h-4 text-red-600" />}
                  <h3 className={styles.titleLink} onClick={() => onSelectTopic(topic)}>
                    {topic.title}
                  </h3>
                  {topic.isHot && (
                    <Badge variant="destructive" className={styles.hotBadge}>
                      🔥 Popular
                    </Badge>
                  )}
                </div>

                <div className={styles.topicMeta}>
                  <div className={styles.authorInfo}>
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={topic.authorAvatar || "/placeholder.svg"} alt={topic.author} />
                      <AvatarFallback>
                        {topic.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>Por {topic.author}</span>
                  </div>
                  <Badge variant="outline">{topic.subject}</Badge>
                  <span>{new Date(topic.createdAt).toLocaleDateString("es-ES")}</span>
                </div>

                <p className={styles.topicPreview}>{topic.content}</p>

                <div className={styles.topicTags}>
                  {topic.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className={styles.topicActions}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectTopic(topic)}
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {topic.replies.length > 0 ? `${topic.replies.length} respuestas` : "Responder"}
                  </Button>
                </div>
              </div>

              <Button variant="ghost" size="sm" onClick={() => onSelectTopic(topic)}>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
