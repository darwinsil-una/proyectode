"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Calendar, MapPin, Star, Eye, Clock, Shield } from "lucide-react"
import styles from "./group-list.module.css"

interface StudyGroup {
  id: number
  name: string
  subject: string
  description: string
  members: number
  maxMembers: number
  nextMeeting: string
  location: string
  rating: number
  tags: string[]
  isPrivate: boolean
  createdBy: string
  createdAt: string
}

interface GroupListProps {
  groups: StudyGroup[]
  onSelectGroup: (group: StudyGroup) => void
  onJoinGroup: (groupId: number) => void
  onCreateGroup: () => void
}

export default function GroupList({ groups, onSelectGroup, onJoinGroup, onCreateGroup }: GroupListProps) {
  if (groups.length === 0) {
    return (
      <Card>
        <CardContent className={styles.emptyState}>
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron grupos</h3>
          <p className="text-gray-500 mb-4">Ajusta los filtros o crea un nuevo grupo de estudio</p>
          <Button onClick={onCreateGroup}>Crear Nuevo Grupo</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={styles.groupGrid}>
      {groups.map((group) => (
        <Card key={group.id} className={styles.groupCard}>
          <CardHeader>
            <div className={styles.groupHeader}>
              <div className={styles.groupInfo}>
                <div className={styles.groupTitle}>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  {group.isPrivate && <Shield className="w-4 h-4 text-gray-500" />}
                </div>
                <CardDescription className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {group.subject}
                </CardDescription>
              </div>
              <div className={styles.groupActions}>
                <div className={styles.rating}>
                  <Star className="w-4 h-4 text-red-500 fill-current" />
                  <span className="text-sm font-medium">{group.rating}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onSelectGroup(group)}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className={styles.groupContent}>
            <p className={styles.description}>{group.description}</p>

            <div className={styles.tags}>
              {group.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className={styles.groupDetails}>
              <div className={styles.membersProgress}>
                <Users className="w-4 h-4" />
                <span>
                  {group.members}/{group.maxMembers} miembros
                </span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{ width: `${(group.members / group.maxMembers) * 100}%` }}
                  />
                </div>
              </div>
              {group.nextMeeting && (
                <div className={styles.detailItem}>
                  <Calendar className="w-4 h-4" />
                  <span>Próxima reunión: {new Date(group.nextMeeting).toLocaleDateString("es-ES")}</span>
                </div>
              )}
              {group.location && (
                <div className={styles.detailItem}>
                  <MapPin className="w-4 h-4" />
                  <span>{group.location}</span>
                </div>
              )}
              <div className={styles.detailItem}>
                <Clock className="w-4 h-4" />
                <span>
                  Creado por {group.createdBy} el {new Date(group.createdAt).toLocaleDateString("es-ES")}
                </span>
              </div>
            </div>

            <div className={styles.groupButtons}>
              <Button
                onClick={() => onJoinGroup(group.id)}
                className="flex-1"
                disabled={group.members >= group.maxMembers}
              >
                {group.members >= group.maxMembers ? "Grupo Lleno" : "Unirse al Grupo"}
              </Button>
              <Button variant="outline" size="sm" onClick={() => onSelectGroup(group)}>
                Ver Detalles
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
