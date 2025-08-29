import type { Task } from "@/types"

export class TaskService {
  static getInitialTasks(): Task[] {
    return [
      {
        id: 1,
        title: "Ensayo de Historia Contemporánea",
        subject: "Historia",
        dueDate: "2024-01-15",
        priority: "high",
        status: "pending",
        estimatedHours: 8,
        description: "Análisis de la Guerra Fría y sus consecuencias",
        reminder: true,
        reminderTime: "09:00",
        createdAt: "2024-01-10",
      },
      {
        id: 2,
        title: "Laboratorio de Química Orgánica",
        subject: "Química",
        dueDate: "2024-01-17",
        priority: "medium",
        status: "in-progress",
        estimatedHours: 4,
        description: "Síntesis de compuestos aromáticos",
        reminder: false,
        createdAt: "2024-01-08",
      },
      {
        id: 3,
        title: "Proyecto Final de Programación",
        subject: "Informática",
        dueDate: "2024-01-25",
        priority: "high",
        status: "pending",
        estimatedHours: 20,
        description: "Desarrollo de aplicación web con React",
        reminder: true,
        reminderTime: "10:00",
        createdAt: "2024-01-05",
      },
      {
        id: 4,
        title: "Examen de Matemáticas",
        subject: "Matemáticas",
        dueDate: "2024-01-20",
        priority: "high",
        status: "pending",
        estimatedHours: 6,
        description: "Examen parcial de cálculo integral",
        reminder: true,
        reminderTime: "08:00",
        createdAt: "2024-01-12",
      },
      {
        id: 5,
        title: "Presentación de Física",
        subject: "Física",
        dueDate: "2024-01-22",
        priority: "medium",
        status: "pending",
        estimatedHours: 3,
        description: "Presentación sobre mecánica cuántica",
        reminder: false,
        createdAt: "2024-01-09",
      },
    ]
  }

  static getUpcomingTasks(tasks: Task[]): Task[] {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

    return tasks
      .filter((task) => {
        const taskDate = new Date(task.dueDate)
        return taskDate >= today && taskDate <= nextWeek && task.status !== "completed"
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  }

  static calculateTaskStats(tasks: Task[]) {
    const totalHours = tasks.reduce((sum, task) => sum + task.estimatedHours, 0)
    const completedTasks = tasks.filter((task) => task.status === "completed").length
    const upcomingTasks = this.getUpcomingTasks(tasks).length

    return {
      totalTasks: tasks.length,
      completedTasks,
      totalHours,
      upcomingTasks,
    }
  }
}
