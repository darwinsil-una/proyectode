"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare } from "lucide-react"
import styles from "./create-topic-modal.module.css"

interface CreateTopicModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateTopic: (topicData: any) => void
  subjects: string[]
}

export default function CreateTopicModal({ isOpen, onClose, onCreateTopic, subjects }: CreateTopicModalProps) {
  const [newTopic, setNewTopic] = useState({
    title: "",
    content: "",
    subject: "",
    tags: "",
  })

  const handleSubmit = () => {
    if (newTopic.title && newTopic.content && newTopic.subject) {
      const topicData = {
        ...newTopic,
        tags: newTopic.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      }
      onCreateTopic(topicData)
      setNewTopic({
        title: "",
        content: "",
        subject: "",
        tags: "",
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBackdrop} onClick={onClose} />
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Crear Nuevo Tema</h2>
          <p className={styles.modalSubtitle}>Inicia una discusión o haz una pregunta a la comunidad</p>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <Label htmlFor="topicTitle">Título *</Label>
            <Input
              id="topicTitle"
              value={newTopic.title}
              onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
              placeholder="Ej: ¿Alguien tiene apuntes de la clase de Termodinámica?"
            />
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="topicSubject">Materia *</Label>
            <Select value={newTopic.subject} onValueChange={(value) => setNewTopic({ ...newTopic, subject: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una materia" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="topicContent">Contenido *</Label>
            <Textarea
              id="topicContent"
              value={newTopic.content}
              onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
              placeholder="Describe tu pregunta o tema de discusión en detalle..."
              rows={6}
            />
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="topicTags">Etiquetas (separadas por comas)</Label>
            <Input
              id="topicTags"
              value={newTopic.tags}
              onChange={(e) => setNewTopic({ ...newTopic, tags: e.target.value })}
              placeholder="Ej: termodinámica, apuntes, física"
            />
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button onClick={handleSubmit} className="flex-1">
            <MessageSquare className="w-4 h-4 mr-2" />
            Publicar Tema
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
