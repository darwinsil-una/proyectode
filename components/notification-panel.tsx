"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, X } from "lucide-react"
import styles from "./notification-panel.module.css"

interface Notification {
  id: number
  type: "message" | "group_invite" | "meeting" | "resource" | "mention" | "like" | "reply"
  title: string
  content: string
  timestamp: string
  read: boolean
  actionUrl?: string
  senderId?: number
  senderName?: string
  senderAvatar?: string
}

interface NotificationPanelProps {
  isOpen: boolean
  onClose: () => void
  notifications: Notification[]
  onMarkAsRead: (notificationId: number) => void
  onMarkAllAsRead: () => void
  onDeleteNotification: (notificationId: number) => void
}

export default function NotificationPanel({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
}: NotificationPanelProps) {
  if (!isOpen) return null

  return (
    <div className={styles.panelOverlay}>
      <div className={styles.panelBackdrop} onClick={onClose} />
      <div className={styles.panelContent}>
        <div className={styles.panelHeader}>
          <div className={styles.headerContent}>
            <h3 className={styles.panelTitle}>Notificaciones</h3>
            <div className={styles.headerActions}>
              <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
                Marcar todas como leídas
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.notificationList}>
          {notifications.length === 0 ? (
            <div className={styles.emptyState}>
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No tienes notificaciones</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`${styles.notificationItem} ${!notification.read ? styles.unread : ""}`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className={styles.notificationContent}>
                  {notification.senderAvatar && (
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={notification.senderAvatar || "/placeholder.svg"}
                        alt={notification.senderName}
                      />
                      <AvatarFallback>
                        {notification.senderName
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className={styles.notificationText}>
                    <div className={styles.notificationHeader}>
                      <h4 className={styles.notificationTitle}>{notification.title}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteNotification(notification.id)
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className={styles.notificationMessage}>{notification.content}</p>
                    <p className={styles.notificationTime}>
                      {new Date(notification.timestamp).toLocaleString("es-ES")}
                    </p>
                  </div>
                  {!notification.read && <div className={styles.unreadDot} />}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
