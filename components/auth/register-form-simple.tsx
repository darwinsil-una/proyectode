"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye, EyeOff, GraduationCap, User, BookOpen, Settings, AlertCircle } from "lucide-react"

interface RegisterFormProps {
  onRegister: (userData: any) => void
  onSwitchToLogin: () => void
}

export default function RegisterFormSimple({ onRegister, onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    // Datos Personales
    nombreCompleto: "",
    institucion: "",
    correoInstitucional: "",
    telefono: "",
    password: "",
    confirmPassword: "",

    // Datos Académicos
    numeroMatricula: "",
    carrera: "",
    anoEstudio: "",
    universidad: "",

    // Rol en la Plataforma
    rol: "estudiante",

    // Preferencias Iniciales
    areasInteres: [] as string[],
    idioma: "",
    notificaciones: [] as string[],
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    // Validación básica
    const newErrors: Record<string, string> = {}

    if (!formData.nombreCompleto) newErrors.nombreCompleto = "Nombre completo es requerido"
    if (!formData.correoInstitucional) newErrors.correoInstitucional = "Correo institucional es requerido"
    if (!formData.password) newErrors.password = "Contraseña es requerida"
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirmar contraseña es requerido"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden"
    if (!formData.numeroMatricula) newErrors.numeroMatricula = "Número de matrícula es requerido"
    if (!formData.carrera) newErrors.carrera = "Carrera es requerida"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Simular registro exitoso
    setTimeout(() => {
      onRegister({
        ...formData,
        isAuthenticated: true,
        registrationTime: new Date().toISOString(),
        user: {
          name: formData.nombreCompleto,
          email: formData.correoInstitucional,
          type: formData.rol,
        },
      })
      setIsLoading(false)
    }, 2000)
  }

  const handleAreaInteresChange = (area: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        areasInteres: [...prev.areasInteres, area],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        areasInteres: prev.areasInteres.filter((a) => a !== area),
      }))
    }
  }

  const handleNotificacionChange = (tipo: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        notificaciones: [...prev.notificaciones, tipo],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        notificaciones: prev.notificaciones.filter((n) => n !== tipo),
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Registro Académico</h1>
          <p className="text-gray-600 mt-2">Completa la información para acceder a la plataforma</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Datos Personales */}
          <Card>
            <CardHeader className="bg-red-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Datos Personales
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombreCompleto">Nombre Completo *</Label>
                  <Input
                    id="nombreCompleto"
                    value={formData.nombreCompleto}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nombreCompleto: e.target.value }))}
                    className={errors.nombreCompleto ? "border-red-500" : ""}
                  />
                  {errors.nombreCompleto && (
                    <p className="text-red-600 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.nombreCompleto}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institucion">Institución</Label>
                  <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, institucion: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu institución" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="universidad-nacional">Universidad Nacional</SelectItem>
                      <SelectItem value="universidad-central">Universidad Central</SelectItem>
                      <SelectItem value="instituto-tecnologico">Instituto Tecnológico</SelectItem>
                      <SelectItem value="universidad-autonoma">Universidad Autónoma</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correoInstitucional">Correo Institucional *</Label>
                  <Input
                    id="correoInstitucional"
                    type="email"
                    value={formData.correoInstitucional}
                    onChange={(e) => setFormData((prev) => ({ ...prev, correoInstitucional: e.target.value }))}
                    className={errors.correoInstitucional ? "border-red-500" : ""}
                  />
                  {errors.correoInstitucional && (
                    <p className="text-red-600 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.correoInstitucional}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData((prev) => ({ ...prev, telefono: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      className={`pr-10 ${errors.password ? "border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      className={`pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Datos Académicos */}
          <Card>
            <CardHeader className="bg-gray-800 text-white">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Datos Académicos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numeroMatricula">Número de Matrícula o Código *</Label>
                  <Input
                    id="numeroMatricula"
                    value={formData.numeroMatricula}
                    onChange={(e) => setFormData((prev) => ({ ...prev, numeroMatricula: e.target.value }))}
                    className={errors.numeroMatricula ? "border-red-500" : ""}
                  />
                  {errors.numeroMatricula && (
                    <p className="text-red-600 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.numeroMatricula}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carrera">Carrera o Programa Académico *</Label>
                  <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, carrera: value }))}>
                    <SelectTrigger className={errors.carrera ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecciona tu carrera" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ingenieria-sistemas">Ingeniería de Sistemas</SelectItem>
                      <SelectItem value="medicina">Medicina</SelectItem>
                      <SelectItem value="derecho">Derecho</SelectItem>
                      <SelectItem value="administracion">Administración de Empresas</SelectItem>
                      <SelectItem value="psicologia">Psicología</SelectItem>
                      <SelectItem value="arquitectura">Arquitectura</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.carrera && (
                    <p className="text-red-600 text-sm flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.carrera}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="anoEstudio">Año o Dedicación del Curso</Label>
                  <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, anoEstudio: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tu año" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primer-ano">Primer Año</SelectItem>
                      <SelectItem value="segundo-ano">Segundo Año</SelectItem>
                      <SelectItem value="tercer-ano">Tercer Año</SelectItem>
                      <SelectItem value="cuarto-ano">Cuarto Año</SelectItem>
                      <SelectItem value="quinto-ano">Quinto Año</SelectItem>
                      <SelectItem value="postgrado">Postgrado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="universidad">Universidad / Facultad</Label>
                  <Input
                    id="universidad"
                    value={formData.universidad}
                    onChange={(e) => setFormData((prev) => ({ ...prev, universidad: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rol en la Plataforma */}
          <Card>
            <CardHeader className="bg-red-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Rol en la Plataforma
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <Label>Selecciona tu rol inicial *</Label>
                <RadioGroup
                  value={formData.rol}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, rol: value }))}
                  className="space-y-3"
                >
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="estudiante" id="estudiante" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="estudiante" className="font-medium">
                        Estudiante
                      </Label>
                      <p className="text-sm text-gray-600">Acceso al calendario, IA, red colaborativa</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 border rounded-lg">
                    <RadioGroupItem value="administrador" id="administrador" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="administrador" className="font-medium">
                        Administrador Académico
                      </Label>
                      <p className="text-sm text-gray-600">Gestiona usuarios, cursos, contenido</p>
                    </div>
                  </div>
                </RadioGroup>
                <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                  * Los roles de administrador y tutor requieren validación adicional
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preferencias Iniciales */}
          <Card>
            <CardHeader className="bg-gray-800 text-white">
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Preferencias Iniciales
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Áreas de Interés Académico */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Áreas de Interés Académico</h4>
                <div className="space-y-3">
                  {/* Primera fila */}
                  <div className="flex flex-wrap gap-6">
                    {["Programación", "Ciencias", "Historia", "Física", "Matemáticas"].map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={area}
                          checked={formData.areasInteres.includes(area)}
                          onCheckedChange={(checked) => handleAreaInteresChange(area, checked as boolean)}
                        />
                        <Label htmlFor={area} className="text-sm font-medium text-gray-700">
                          {area}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {/* Segunda fila */}
                  <div className="flex flex-wrap gap-6">
                    {["Literatura", "Arte", "Deportes", "Música", "Idiomas"].map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={area}
                          checked={formData.areasInteres.includes(area)}
                          onCheckedChange={(checked) => handleAreaInteresChange(area, checked as boolean)}
                        />
                        <Label htmlFor={area} className="text-sm font-medium text-gray-700">
                          {area}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Idioma Preferido */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Idioma Preferido</h4>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, idioma: value }))}>
                  <SelectTrigger className="max-w-xs">
                    <SelectValue placeholder="Selecciona tu idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="español">Español</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="portugues">Português</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Método de Notificación */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Método de Notificación</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="correo-electronico"
                      checked={formData.notificaciones.includes("correo-electronico")}
                      onCheckedChange={(checked) => handleNotificacionChange("correo-electronico", checked as boolean)}
                    />
                    <Label htmlFor="correo-electronico" className="text-sm font-medium text-gray-700">
                      Correo electrónico
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="notificaciones-push"
                      checked={formData.notificaciones.includes("notificaciones-push")}
                      onCheckedChange={(checked) => handleNotificacionChange("notificaciones-push", checked as boolean)}
                    />
                    <Label htmlFor="notificaciones-push" className="text-sm font-medium text-gray-700">
                      Notificaciones push
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mensajes-sms"
                      checked={formData.notificaciones.includes("mensajes-sms")}
                      onCheckedChange={(checked) => handleNotificacionChange("mensajes-sms", checked as boolean)}
                    />
                    <Label htmlFor="mensajes-sms" className="text-sm font-medium text-gray-700">
                      Mensajes SMS
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onSwitchToLogin}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              Volver al Login
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-red-600 hover:bg-red-700">
              {isLoading ? "Registrando..." : "Registrarse"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
