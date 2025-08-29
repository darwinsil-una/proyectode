"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye, EyeOff, User, GraduationCap, Shield, BookOpen, Settings, Bell } from "lucide-react"
import styles from "./auth.module.css"

interface RegisterFormProps {
  onRegister: (userData: any) => void
  onSwitchToLogin: () => void
}

export default function RegisterForm({ onRegister, onSwitchToLogin }: RegisterFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Datos Personales
    fullName: "",
    institution: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",

    // Datos Académicos
    studentId: "",
    academicProgram: "",
    yearCourse: "",
    university: "",

    // Rol en la Plataforma
    userType: "student",

    // Preferencias Iniciales
    academicInterests: [] as string[],
    preferredLanguage: "es",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const academicInterests = [
    "Programación",
    "Ciencias",
    "Historia",
    "Física",
    "Matemáticas",
    "Literatura",
    "Arte",
    "Deportes",
    "Música",
    "Idiomas",
    "Química",
    "Biología",
  ]

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.fullName) newErrors.fullName = "El nombre es requerido"
        if (!formData.email) newErrors.email = "El email es requerido"
        if (!formData.password) newErrors.password = "La contraseña es requerida"
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Las contraseñas no coinciden"
        }
        break
      case 2:
        if (formData.userType === "student") {
          if (!formData.studentId) newErrors.studentId = "El número de matrícula es requerido"
          if (!formData.academicProgram) newErrors.academicProgram = "El programa académico es requerido"
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(currentStep)) return

    setIsLoading(true)

    // Simular registro
    setTimeout(() => {
      onRegister(formData)
      setIsLoading(false)
    }, 2000)
  }

  const handleInterestToggle = (interest: string) => {
    const newInterests = formData.academicInterests.includes(interest)
      ? formData.academicInterests.filter((i) => i !== interest)
      : [...formData.academicInterests, interest]

    setFormData({ ...formData, academicInterests: newInterests })
  }

  const renderStep1 = () => (
    <div className={styles.stepContent}>
      <div className={styles.sectionHeader}>
        <User className="w-4 h-4" />
        <span>Datos Personales</span>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <Label htmlFor="fullName">Nombre Completo *</Label>
          <Input
            id="fullName"
            placeholder="Tu nombre completo"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className={errors.fullName ? styles.inputError : ""}
          />
          {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor="institution">Institución</Label>
          <Select onValueChange={(value) => setFormData({ ...formData, institution: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona tu institución" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unam">Universidad Nacional Autónoma de México</SelectItem>
              <SelectItem value="ipn">Instituto Politécnico Nacional</SelectItem>
              <SelectItem value="itesm">Tecnológico de Monterrey</SelectItem>
              <SelectItem value="uag">Universidad Autónoma de Guadalajara</SelectItem>
              <SelectItem value="other">Otra institución</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <Label htmlFor="email">Email Institucional *</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu.email@universidad.edu"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={errors.email ? styles.inputError : ""}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor="phone">Teléfono</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+52 55 1234 5678"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <Label htmlFor="password">Contraseña *</Label>
          <div className={styles.inputWrapper}>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={errors.password ? styles.inputError : ""}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle}>
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <span className={styles.errorText}>{errors.password}</span>}
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
          <div className={styles.inputWrapper}>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repite tu contraseña"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={errors.confirmPassword ? styles.inputError : ""}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={styles.passwordToggle}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword}</span>}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className={styles.stepContent}>
      <div className={styles.sectionHeader}>
        <BookOpen className="w-4 h-4" />
        <span>Datos Académicos</span>
      </div>

      {formData.userType === "student" && (
        <>
          <div className={styles.formGroup}>
            <Label htmlFor="studentId">Número de Matrícula o Código *</Label>
            <Input
              id="studentId"
              placeholder="Ej: 2024-0123456"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              className={errors.studentId ? styles.inputError : ""}
            />
            {errors.studentId && <span className={styles.errorText}>{errors.studentId}</span>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <Label htmlFor="academicProgram">Carrera o Programa Académico *</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, academicProgram: value })}>
                <SelectTrigger className={errors.academicProgram ? styles.inputError : ""}>
                  <SelectValue placeholder="Selecciona tu carrera" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ingenieria-sistemas">Ingeniería en Sistemas</SelectItem>
                  <SelectItem value="medicina">Medicina</SelectItem>
                  <SelectItem value="derecho">Derecho</SelectItem>
                  <SelectItem value="psicologia">Psicología</SelectItem>
                  <SelectItem value="administracion">Administración</SelectItem>
                  <SelectItem value="arquitectura">Arquitectura</SelectItem>
                  <SelectItem value="other">Otra carrera</SelectItem>
                </SelectContent>
              </Select>
              {errors.academicProgram && <span className={styles.errorText}>{errors.academicProgram}</span>}
            </div>

            <div className={styles.formGroup}>
              <Label htmlFor="yearCourse">Año o Dedicación al Curso</Label>
              <Select onValueChange={(value) => setFormData({ ...formData, yearCourse: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu año" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1er Año</SelectItem>
                  <SelectItem value="2">2do Año</SelectItem>
                  <SelectItem value="3">3er Año</SelectItem>
                  <SelectItem value="4">4to Año</SelectItem>
                  <SelectItem value="5">5to Año</SelectItem>
                  <SelectItem value="graduate">Posgrado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className={styles.formGroup}>
            <Label htmlFor="university">Universidad / Facultad</Label>
            <Input
              id="university"
              placeholder="Nombre completo de tu universidad o facultad"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
            />
          </div>
        </>
      )}

      {formData.userType === "admin" && (
        <div className={styles.adminInfo}>
          <div className={styles.infoCard}>
            <Shield className="w-6 h-6 text-red-600" />
            <div>
              <h4>Cuenta de Administrador</h4>
              <p>Como administrador tendrás acceso a:</p>
              <ul>
                <li>• Gestión de usuarios y permisos</li>
                <li>• Administración de cursos y contenido</li>
                <li>• Reportes y análisis académicos</li>
                <li>• Configuración de la plataforma</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderStep3 = () => (
    <div className={styles.stepContent}>
      <div className={styles.sectionHeader}>
        <Shield className="w-4 h-4" />
        <span>Rol en la Plataforma</span>
      </div>

      <div className={styles.roleSelection}>
        <p className={styles.roleDescription}>Selecciona tu rol principal *</p>

        <RadioGroup
          value={formData.userType}
          onValueChange={(value) => setFormData({ ...formData, userType: value })}
          className={styles.radioGroup}
        >
          <div className={styles.roleOption}>
            <RadioGroupItem value="student" id="student" />
            <Label htmlFor="student" className={styles.roleLabel}>
              <GraduationCap className="w-5 h-5" />
              <div>
                <div className={styles.roleTitle}>Estudiante</div>
                <div className={styles.roleDesc}>Acceso al calendario, IA, colaboración</div>
              </div>
            </Label>
          </div>

          <div className={styles.roleOption}>
            <RadioGroupItem value="admin" id="admin" />
            <Label htmlFor="admin" className={styles.roleLabel}>
              <Shield className="w-5 h-5" />
              <div>
                <div className={styles.roleTitle}>Administrador Académico</div>
                <div className={styles.roleDesc}>Gestiona usuarios, cursos, contenido</div>
              </div>
            </Label>
          </div>
        </RadioGroup>

        <p className={styles.roleNote}>* Los roles de administrador y tutor requieren validación adicional</p>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className={styles.stepContent}>
      <div className={styles.sectionHeader}>
        <Settings className="w-4 h-4" />
        <span>Preferencias Iniciales</span>
      </div>

      <div className={styles.preferencesSection}>
        <h4>Áreas de Interés Académico</h4>
        <div className={styles.interestsGrid}>
          {academicInterests.map((interest) => (
            <div key={interest} className={styles.interestItem}>
              <Checkbox
                id={interest}
                checked={formData.academicInterests.includes(interest)}
                onCheckedChange={() => handleInterestToggle(interest)}
              />
              <Label htmlFor={interest}>{interest}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.preferencesSection}>
        <h4>Idioma Preferido</h4>
        <Select
          value={formData.preferredLanguage}
          onValueChange={(value) => setFormData({ ...formData, preferredLanguage: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="pt">Português</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className={styles.preferencesSection}>
        <div className={styles.sectionHeader}>
          <Bell className="w-4 h-4" />
          <span>Método de Notificación</span>
        </div>

        <div className={styles.notificationOptions}>
          <div className={styles.notificationItem}>
            <Checkbox
              id="emailNotif"
              checked={formData.notifications.email}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, email: !!checked },
                })
              }
            />
            <Label htmlFor="emailNotif">Correo electrónico</Label>
          </div>

          <div className={styles.notificationItem}>
            <Checkbox
              id="pushNotif"
              checked={formData.notifications.push}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, push: !!checked },
                })
              }
            />
            <Label htmlFor="pushNotif">Notificaciones push</Label>
          </div>

          <div className={styles.notificationItem}>
            <Checkbox
              id="smsNotif"
              checked={formData.notifications.sms}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, sms: !!checked },
                })
              }
            />
            <Label htmlFor="smsNotif">Mensajes SMS</Label>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <Card>
          <CardHeader className={styles.cardHeader}>
            <div className={styles.headerIcon}>
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className={styles.cardTitle}>Registro Académico</CardTitle>
            <CardDescription className={styles.cardDescription}>
              Completa la información para acceder a la plataforma
            </CardDescription>
          </CardHeader>

          <CardContent className={styles.cardContent}>
            {/* Progress Indicator */}
            <div className={styles.progressIndicator}>
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`${styles.progressStep} ${
                    step <= currentStep ? styles.active : ""
                  } ${step < currentStep ? styles.completed : ""}`}
                >
                  {step}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}

              <div className={styles.formActions}>
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={handleBack} className={styles.backButton}>
                    Anterior
                  </Button>
                )}

                {currentStep < 4 ? (
                  <Button type="button" onClick={handleNext} className={styles.nextButton}>
                    Siguiente
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading} className={styles.submitButton}>
                    {isLoading ? "Registrando..." : "Registrarse"}
                  </Button>
                )}
              </div>
            </form>

            <div className={styles.authSwitch}>
              <span>¿Ya tienes cuenta?</span>
              <Button type="button" variant="link" onClick={onSwitchToLogin} className={styles.switchButton}>
                Inicia sesión aquí
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
