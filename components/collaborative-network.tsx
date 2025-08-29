"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Search, Plus } from "lucide-react"

// Import components
import Forum from "./forum"
import CreateTopicModal from "./create-topic-modal"
import TopicDetailModal from "./topic-detail-modal"

// Interfaces
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

export default function CollaborativeNetwork() {
  // Estados principales
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("forum")
  const [showCreateTopic, setShowCreateTopic] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(null)
  const [showTopicDetail, setShowTopicDetail] = useState(false)

  // Filtros
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")

  // Estados de datos
  const [forumTopics, setForumTopics] = useState<ForumTopic[]>([
    {
      id: 1,
      title: "¿Alguien tiene apuntes de la clase de Termodinámica del viernes?",
      content:
        "Hola compañeros, no pude asistir a la clase del viernes pasado sobre termodinámica. ¿Alguien podría compartir sus apuntes? Especialmente necesito la parte sobre el segundo principio. ¡Gracias de antemano!",
      author: "Carlos Mendoza",
      authorAvatar: "/student-carlos.png",
      subject: "Física",
      replies: [
        {
          id: 1,
          content:
            "¡Hola Carlos! Yo tengo los apuntes completos de esa clase. Te los puedo compartir por email. La parte del segundo principio está muy bien explicada con ejemplos prácticos.",
          author: "Ana Rodríguez",
          authorAvatar: "/student-ana.png",
          createdAt: "2024-01-12T10:30:00",
        },
        {
          id: 2,
          content:
            "También recomiendo revisar el capítulo 5 del libro de Cengel, tiene ejercicios muy similares a los que vimos en clase.",
          author: "Miguel Torres",
          authorAvatar: "/student-miguel.png",
          createdAt: "2024-01-12T11:15:00",
        },
      ],
      views: 45,
      likes: 12,
      isHot: true,
      isPinned: false,
      lastActivity: "2 horas",
      createdAt: "2024-01-12T09:00:00",
      tags: ["Física", "Termodinámica", "Apuntes"],
    },
    {
      id: 2,
      title: "Grupo de estudio para el parcial de Historia Contemporánea",
      content:
        "Estoy organizando un grupo de estudio para el parcial de Historia Contemporánea que es el próximo mes. La idea es reunirnos 2 veces por semana para repasar los temas más importantes. ¿Quién se apunta?",
      author: "Ana Rodríguez",
      authorAvatar: "/student-ana.png",
      subject: "Historia",
      replies: [],
      views: 28,
      likes: 8,
      isHot: false,
      isPinned: false,
      lastActivity: "4 horas",
      createdAt: "2024-01-11T14:00:00",
      tags: ["Historia", "Grupo de Estudio", "Parcial"],
    },
  ])

  const subjects = [
    "Matemáticas",
    "Física",
    "Química",
    "Historia",
    "Literatura",
    "Informática",
    "Inglés",
    "Filosofía",
    "Biología",
    "Economía",
  ]

  // Funciones de utilidad
  const getFilteredTopics = () => {
    return forumTopics.filter((topic) => {
      const matchesSearch =
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesSubject = subjectFilter === "all" || topic.subject === subjectFilter

      return matchesSearch && matchesSubject
    })
  }

  const handleSelectTopic = (topic: ForumTopic) => {
    setSelectedTopic(topic)
    setShowTopicDetail(true)
  }

  const handleAddReply = (topicId: number, replyContent: string) => {
    const newReply: Reply = {
      id: Date.now(),
      content: replyContent,
      author: "María González",
      authorAvatar: "/student-maria.png",
      createdAt: new Date().toISOString(),
    }

    setForumTopics(
      forumTopics.map((topic) => {
        if (topic.id === topicId) {
          return {
            ...topic,
            replies: [...topic.replies, newReply],
          }
        }
        return topic
      }),
    )

    // Actualizar el tema seleccionado también
    if (selectedTopic && selectedTopic.id === topicId) {
      setSelectedTopic({
        ...selectedTopic,
        replies: [...selectedTopic.replies, newReply],
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Red Colaborativa</h2>
          <p className="text-gray-600">Conecta, colabora y aprende con otros estudiantes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setShowCreateTopic(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nuevo Tema
          </Button>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar temas de discusión..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Materia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las materias</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSubjectFilter("all")
                  setAvailabilityFilter("all")
                  setSearchTerm("")
                }}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Limpiar filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="forum" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Foros ({getFilteredTopics().length})
          </TabsTrigger>
        </TabsList>

        {/* Forum Tab */}
        <TabsContent value="forum" className="space-y-4">
          <Forum
            topics={getFilteredTopics()}
            onSelectTopic={handleSelectTopic}
            onLikeTopic={(topicId) => {
              // Esta función ya no se usa pero la mantengo para evitar errores
              setForumTopics(
                forumTopics.map((topic) => (topic.id === topicId ? { ...topic, likes: topic.likes + 1 } : topic)),
              )
            }}
            onCreateTopic={() => setShowCreateTopic(true)}
          />
        </TabsContent>
      </Tabs>

      {/* Modal para crear tema */}
      {showCreateTopic && (
        <CreateTopicModal
          isOpen={showCreateTopic}
          onClose={() => setShowCreateTopic(false)}
          onCreateTopic={(topicData) => {
            const topic: ForumTopic = {
              id: Date.now(),
              ...topicData,
              author: "María González",
              authorAvatar: "/student-maria.png",
              replies: [],
              views: 0,
              likes: 0,
              isHot: false,
              isPinned: false,
              lastActivity: "Ahora",
              createdAt: new Date().toISOString(),
            }
            setForumTopics([topic, ...forumTopics])
            setShowCreateTopic(false)
          }}
          subjects={subjects}
        />
      )}

      {/* Modal para ver detalles del tema y responder */}
      {showTopicDetail && selectedTopic && (
        <TopicDetailModal
          isOpen={showTopicDetail}
          onClose={() => {
            setShowTopicDetail(false)
            setSelectedTopic(null)
          }}
          topic={selectedTopic}
          onAddReply={handleAddReply}
        />
      )}
    </div>
  )
}
