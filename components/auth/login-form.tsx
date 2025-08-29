"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, User, GraduationCap, Shield } from "lucide-react"
import styles from "./auth.module.css"

interface AuthFormProps {
  onLogin: (credentials: any) => void
  onSwitchToRegister: () => void
}

export default function AuthForm({ onLogin, onSwitchToRegister }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "student",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})
    setSuccessMessage("")

    // Validación básica
    const newErrors: Record<string, string> = {}
    if (!formData.email) {
      newErrors.email = "El email es requerido"
    } else if (!/[a-zA-Z]/.test(formData.email)) {
      newErrors.email = "El email debe contener al menos una letra"
    }
    if (!formData.password) newErrors.password = "La contraseña es requerida"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Simular login
    setTimeout(() => {
      // Simple validation passed - call onLogin
      onLogin({
        ...formData,
        isAuthenticated: true,
        loginTime: new Date().toISOString(),
      })
      setIsLoading(false)
      setSuccessMessage("Inicio de sesión exitoso")
    }, 1500)
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <Card>
          <CardHeader className={styles.cardHeader}>
            <div className={styles.headerIcon}>
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className={styles.cardTitle}>Iniciar Sesión</CardTitle>
            <CardDescription className={styles.cardDescription}>Accede a tu plataforma académica</CardDescription>
          </CardHeader>

          <CardContent className={styles.cardContent}>
            {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Tipo de Usuario */}
              <div className={styles.sectionHeader}>
                <User className="w-4 h-4" />
                <span>Tipo de Usuario</span>
              </div>

              <div className={styles.userTypeSelector}>
                <button
                  type="button"
                  className={`${styles.userTypeButton} ${formData.userType === "student" ? styles.active : ""}`}
                  onClick={() => setFormData({ ...formData, userType: "student" })}
                >
                  <GraduationCap className="w-5 h-5" />
                  <div>
                    <div className={styles.userTypeTitle}>Estudiante</div>
                    <div className={styles.userTypeDesc}>Acceso al calendario, IA y colaboración</div>
                  </div>
                </button>

                <button
                  type="button"
                  className={`${styles.userTypeButton} ${formData.userType === "admin" ? styles.active : ""}`}
                  onClick={() => setFormData({ ...formData, userType: "admin" })}
                >
                  <Shield className="w-5 h-5" />
                  <div>
                    <div className={styles.userTypeTitle}>Administrador</div>
                    <div className={styles.userTypeDesc}>Gestiona usuarios, cursos y contenido</div>
                  </div>
                </button>
              </div>

              {/* Credenciales */}
              <div className={styles.sectionHeader}>
                <Lock className="w-4 h-4" />
                <span>Credenciales de Acceso</span>
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="email">Email Institucional</Label>
                <div className={styles.inputWrapper}>
                  <Mail className="w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu.email@universidad.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={errors.email ? styles.inputError : ""}
                  />
                </div>
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <Label htmlFor="password">Contraseña</Label>
                <div className={styles.inputWrapper}>
                  <Lock className="w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Tu contraseña"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={errors.password ? styles.inputError : ""}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.passwordToggle}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <span className={styles.errorText}>{errors.password}</span>}
              </div>

              <div className={styles.formActions}>
                <Button type="submit" disabled={isLoading} className={styles.submitButton}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>

                <Button type="button" variant="ghost" className={styles.linkButton}>
                  ¿Olvidaste tu contraseña?
                </Button>
              </div>
            </form>

            <div className={styles.authSwitch}>
              <span>¿No tienes cuenta?</span>
              <Button type="button" variant="link" onClick={onSwitchToRegister} className={styles.switchButton}>
                Regístrate aquí
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
