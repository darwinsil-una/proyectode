"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus } from "lucide-react"
import styles from "./create-group-modal.module.css"

interface CreateGroupModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateGroup: (groupData: any) => void
  subjects: string[]
}

export default function CreateGroupModal({ isOpen, onClose, onCreateGroup, subjects }: CreateGroupModalProps) {
  const [newGroup, setNewGroup] = useState({
    name: "",
    subject: "",
    description: "",
    maxMembers: 10,
    location: "",
    isPrivate: false,
    tags: "",
  })

  const handleSubmit = () => {
    if (newGroup.name && newGroup.subject && newGroup.description) {
      const groupData = {
        ...newGroup,
        tags: newGroup.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      }
      onCreateGroup(groupData)
      setNewGroup({
        name: "",
        subject: "",
        description: "",
        maxMembers: 10,
        location: "",
        isPrivate: false,
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
          <h2 className={styles.modalTitle}>Crear Nuevo Grupo de Estudio</h2>
          <p className={styles.modalSubtitle}>Organiza un grupo para estudiar con otros compañeros</p>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <Label htmlFor="groupName">Nombre del Grupo *</Label>
            <Input
              id="groupName"
              value={newGroup.name}
              onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
              placeholder="Ej: Cálculo III - Grupo de Estudio"
            />
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="groupSubject">Materia *</Label>
            <Select value={newGroup.subject} onValueChange={(value) => setNewGroup({ ...newGroup, subject: value })}>
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
            <Label htmlFor="groupDescription">Descripción *</Label>
            <Textarea
              id="groupDescription"
              value={newGroup.description}
              onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
              placeholder="Describe los objetivos del grupo, temas a estudiar, metodología..."
              rows={4}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <Label htmlFor="maxMembers">Máximo de Miembros</Label>
              <Input
                id="maxMembers"
                type="number"
                min="2"
                max="50"
                value={newGroup.maxMembers}
                onChange={(e) => setNewGroup({ ...newGroup, maxMembers: Number.parseInt(e.target.value) || 10 })}
              />
            </div>

            <div className={styles.formGroup}>
              <Label htmlFor="groupLocation">Ubicación</Label>
              <Input
                id="groupLocation"
                value={newGroup.location}
                onChange={(e) => setNewGroup({ ...newGroup, location: e.target.value })}
                placeholder="Ej: Biblioteca Central - Sala 3"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="groupTags">Etiquetas (separadas por comas)</Label>
            <Input
              id="groupTags"
              value={newGroup.tags}
              onChange={(e) => setNewGroup({ ...newGroup, tags: e.target.value })}
              placeholder="Ej: matemáticas, cálculo, parciales, integrales"
            />
          </div>

          <div className={styles.switchGroup}>
            <Switch
              id="isPrivate"
              checked={newGroup.isPrivate}
              onCheckedChange={(checked) => setNewGroup({ ...newGroup, isPrivate: checked })}
            />
            <Label htmlFor="isPrivate">Grupo privado (requiere aprobación para unirse)</Label>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button onClick={handleSubmit} className="flex-1">
            <Plus className="w-4 h-4 mr-2" />
            Crear Grupo
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
