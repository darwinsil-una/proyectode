"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, MessageSquare, Eye, Star } from "lucide-react"
import styles from "./student-list.module.css"

interface Student {
  id: number
  name: string
  email: string
  university: string
  career: string
  semester: string
  subjects: string[]
  avatar: string
  isOnline: boolean
  lastSeen: string
  bio: string
  connections: number
  studyGroups: number[]
  rating: number
  badges: string[]
}

interface StudentListProps {
  students: Student[]
  onSelectStudent: (student: Student) => void
  onConnectWithStudent: (studentId: number) => void
  onStartConversation: (studentId: number) => void
}

export default function StudentList({
  students,
  onSelectStudent,
  onConnectWithStudent,
  onStartConversation,
}: StudentListProps) {
  if (students.length === 0) {
    return (
      <Card>
        <CardContent className={styles.emptyState}>
          <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron estudiantes</h3>
          <p className="text-gray-500 mb-4">Ajusta los filtros para encontrar más estudiantes</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={styles.studentGrid}>
      {students.map((student) => (
        <Card key={student.id} className={styles.studentCard}>
          <CardContent className={styles.studentContent}>
            <div className={styles.studentHeader}>
              <div className={styles.avatarContainer}>
                <Avatar className="w-12 h-12">
                  <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                  <AvatarFallback>
                    {student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {student.isOnline && <div className={styles.onlineIndicator} />}
              </div>
              <div className={styles.studentInfo}>
                <h3 className={styles.studentName}>{student.name}</h3>
                <p className={styles.studentSemester}>{student.semester}</p>
                <p className={styles.studentStatus}>{student.isOnline ? "En línea" : `Visto ${student.lastSeen}`}</p>
              </div>
              <div className={styles.rating}>
                <Star className="w-4 h-4 text-red-500 fill-current" />
                <span className="text-sm font-medium">{student.rating}</span>
              </div>
            </div>

            <div className={styles.studentDetails}>
              <p className={styles.university}>{student.university}</p>
              <p className={styles.career}>{student.career}</p>

              <div className={styles.subjects}>
                {student.subjects.map((subject) => (
                  <Badge key={subject} variant="secondary" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>

              <div className={styles.badges}>
                {student.badges.map((badge) => (
                  <Badge key={badge} variant="outline" className={styles.badge}>
                    {badge}
                  </Badge>
                ))}
              </div>

              {student.bio && <p className={styles.bio}>{student.bio}</p>}

              <div className={styles.stats}>
                <span>{student.connections} conexiones</span>
                <span>{student.studyGroups.length} grupos</span>
              </div>
            </div>

            <div className={styles.studentActions}>
              <Button onClick={() => onConnectWithStudent(student.id)} variant="outline" size="sm" className="flex-1">
                <UserPlus className="w-4 h-4 mr-2" />
                Conectar
              </Button>
              <Button onClick={() => onStartConversation(student.id)} size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Mensaje
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onSelectStudent(student)}>
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
