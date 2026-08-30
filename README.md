# 🐍 Snek Security Mx

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-stable-brightgreen.svg)

**Asistente de seguridad con IA para consultas y recomendaciones**  
*Motor propio sin APIs externas - 100% independiente*

[![Demo](https://img.shields.io/badge/demo-online-success)](https://github.com/Falconmx1/Snek-Security-Mx)
[![Documentación](https://img.shields.io/badge/docs-github-blue)](https://github.com/Falconmx1/Snek-Security-Mx)

</div>

---

## 📋 Tabla de Contenidos

- [📖 Descripción](#-descripción)
- [✨ Características](#-características)
- [🚀 Instalación Rápida](#-instalación-rápida)
- [🔧 Configuración](#-configuración)
- [📡 API Endpoints](#-api-endpoints)
- [🎨 Interfaz Web](#-interfaz-web)
- [🧠 Motor de IA](#-motor-de-ia)
- [📊 Ejemplos de Uso](#-ejemplos-de-uso)
- [🛠️ Tecnologías](#️-tecnologías)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🤝 Contribuciones](#-contribuciones)
- [📄 Licencia](#-licencia)
- [👨‍💻 Autor](#-autor)

---

## 📖 Descripción

**Snek Security Mx** es un asistente de seguridad inteligente que utiliza un motor de IA propio para responder consultas de ciberseguridad y ofrecer recomendaciones personalizadas. 

A diferencia de otras soluciones, **no depende de APIs externas** como OpenAI, Google o Azure, lo que lo hace:

- 🔒 **100% privado** - Tus consultas nunca salen del servidor
- 💰 **Sin costes adicionales** - No pagas por API key ni por consulta
- 🚀 **Ultra rápido** - Respuestas instantáneas sin latencia externa
- 🛡️ **Seguro** - Sin dependencias de terceros en la capa de IA

El sistema analiza las consultas mediante un motor basado en **reglas de seguridad**, **heurística avanzada** y un sistema de **recomendaciones personalizadas** que se adapta al perfil y contexto del usuario.

---

## ✨ Características

### 🧠 **Motor de IA Propio**
- ✅ Basado en reglas de seguridad (OWASP, NIST, etc.)
- ✅ Detección de palabras clave y análisis semántico
- ✅ Sistema de recomendaciones personalizadas
- ✅ Detección de nivel de riesgo (Bajo, Medio, Alto, Crítico)
- ✅ Memoria de contexto a corto plazo
- ✅ Sin dependencias externas - No usa OpenAI, Google, Azure, etc.

### 🔒 **Seguridad y Privacidad**
- ✅ Todas las consultas se procesan localmente
- ✅ Sanitización de entradas contra inyección
- ✅ Protección contra DoS (límite de caracteres)
- ✅ Headers de seguridad (Helmet.js)
- ✅ CORS configurable
- ✅ Logs de auditoría

### 🌐 **Interfaz y API**
- ✅ Interfaz web moderna y responsive
- ✅ Sugerencias rápidas de consultas
- ✅ Indicadores de estado en tiempo real
- ✅ API REST completa
- ✅ Estadísticas y métricas del sistema
- ✅ Contexto de sesiones

### 📊 **Sistema de Reglas**
- 🔍 **OWASP Top 10** - Detección y recomendaciones
- 🛡️ **Inyecciones** (SQL, NoSQL, Command)
- 📧 **Phishing** y suplantación
- 🦠 **Malware** (Ransomware, Virus, Troyanos)
- 🔑 **Autenticación** y gestión de contraseñas
- 🔐 **Cifrado** (SSL/TLS, certificados)
- 🛡️ **Firewalls** y seguridad de red
- 🔓 **Zero Trust** y confianza cero
- 💾 **Backups** y recuperación

---

## 🚀 Instalación Rápida

### Requisitos Previos
- Node.js **v18.0.0** o superior
- npm **v9.0.0** o superior
- Git (opcional)

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Falconmx1/Snek-Security-Mx.git
cd Snek-Security-Mx

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor
npm start

Modo Desarrollo (con auto-reload)

npm run dev
Verificar Instalación

# Abre en tu navegador
http://localhost:3000

# O prueba la API con curl
curl http://localhost:3000/health

🔧 Configuración
Variables de Entorno (Opcional)
Crea un archivo .env en la raíz del proyecto:


PORT=3000
NODE_ENV=production
MAX_CONSULTATION_LENGTH=1000
Archivo de Configuración
Edita config/default.json para personalizar:


{
    "server": {
        "port": 3000,
        "host": "0.0.0.0",
        "environment": "production"
    },
    "engine": {
        "maxHistorySize": 1000,
        "memoryTimeout": 3600000,
        "maxRecommendations": 6
    },
    "ui": {
        "title": "🐍 Snek Security Mx",
        "theme": "dark"
    }
}

📡 API Endpoints
1. Health Check
Verifica el estado del sistema.


GET /health

json
{
    "status": "OK",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "version": "1.0.0",
    "uptime": 123.45,
    "memory": { "rss": 52428800 },
    "engine": {
        "memorySize": 10,
        "historySize": 25,
        "uniqueKeywords": 42
    }
}
2. Consultar ⭐
Envía una consulta de seguridad.


POST /consultar
Content-Type: application/json



{
    "consulta": "¿Cómo proteger mi aplicación contra inyección SQL?"
}
Respuesta:

json
{
    "success": true,
    "consulta": "¿Cómo proteger mi aplicación contra inyección SQL?",
    "respuesta": "Las inyecciones ocurren cuando datos no confiables...",
    "recomendaciones": [
        "Usar consultas parametrizadas (prepared statements)",
        "Validar y sanitizar todas las entradas",
        "Implementar WAF (Web Application Firewall)"
    ],
    "nivel_riesgo": "Alto",
    "palabras_clave": ["inyección", "sql", "proteger"],
    "perfil": "Desarrollador",
    "contexto": "Desarrollo",
    "confianza": 0.85,
    "session_id": "k3xj2p5r",
    "timestamp": "2024-01-01T12:00:00.000Z"
}
3. Estadísticas
Obtén estadísticas del motor.


GET /stats

json
{
    "success": true,
    "timestamp": "2024-01-01T12:00:00.000Z",
    "stats": {
        "memorySize": 15,
        "historySize": 42,
        "lastConsultation": "2024-01-01T11:55:00.000Z",
        "uniqueKeywords": 68
    },
    "summary": {
        "totalConsultas": 42,
        "distribucionRiesgos": {
            "Bajo": 15,
            "Medio": 18,
            "Alto": 7,
            "Crítico": 2
        },
        "keywordsMasComunes": [
            "seguridad (12)",
            "contraseña (8)",
            "firewall (6)"
        ]
    }
}
4. Resumen
Resumen detallado de consultas.


GET /summary
5. Contexto de Sesión
Obtén el contexto de una sesión específica.


GET /context/:sessionId
6. Versión
Información de la aplicación.


GET /version
🎨 Interfaz Web
La interfaz web está disponible en http://localhost:3000 y ofrece:

💬 Chat interactivo con el asistente

🎯 Sugerencias rápidas para consultas comunes

📊 Estado del sistema en tiempo real

🔍 Visualización de recomendaciones y niveles de riesgo

📱 Diseño responsive para todos los dispositivos

Capturas de Pantalla

┌────────────────────────────────────────────┐
│  🐍  Snek Security Mx                      │
│      Asistente de seguridad con IA         │
│      ● Conectado  v1.0.0                  │
├────────────────────────────────────────────┤
│  ● Estado: Conectado  Consultas: 42       │
│  Memoria: 42.5 MB  Uptime: 2h 15m        │
├────────────────────────────────────────────┤
│  ┌──────────────────────────────────────┐ │
│  │ 🐍  ¡Hola! Soy Snek Security Mx      │ │
│  │     Soy tu asistente de seguridad... │ │
│  │                                      │ │
│  │     Escribe tu consulta abajo 👇     │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  [🛡️ SQL Injection] [🔑 Contraseñas]      │
│  [📋 OWASP Top 10] [💻 Dev Security]      │
│                                            │
│  ┌─────────────────────────────┐ [Enviar→]│
│  │ Escribe tu consulta...      │          │
│  └─────────────────────────────┘          │
└────────────────────────────────────────────┘
🧠 Motor de IA
¿Cómo Funciona?
Análisis de Entrada

Sanitización y normalización del texto

Extracción de palabras clave

Detección de patrones de seguridad

Búsqueda en Base de Conocimiento

Coincidencia con reglas predefinidas (OWASP, NIST, etc.)

Detección de temas de seguridad

Identificación de nivel de riesgo

Generación de Respuesta

Combinación de reglas coincidentes

Construcción de respuesta contextual

Generación de recomendaciones

Personalización

Detección de perfil (Desarrollador, Admin, Usuario, Gerente)

Identificación de contexto (Desarrollo, Producción, Aprendizaje)

Recomendaciones adaptadas

Memoria y Contexto

Almacenamiento de sesión

Historial de consultas

Análisis de tendencias

Base de Conocimiento
El motor incluye reglas para:

OWASP Top 10 - Vulnerabilidades web

Inyecciones - SQL, NoSQL, Command

Phishing - Suplantación y engaños

Malware - Virus, Ransomware, Troyanos

Autenticación - Login, MFA, Contraseñas

Cifrado - SSL/TLS, Certificados

Firewalls - Seguridad de red

Zero Trust - Confianza cero

Backups - Copias de seguridad

Contraseñas - Gestión y políticas

📊 Ejemplos de Uso
1. Consulta Básica (cURL)

curl -X POST http://localhost:3000/consultar \
  -H "Content-Type: application/json" \
  -d '{"consulta":"¿Qué es OWASP Top 10?"}'
2. Consulta con JavaScript (Fetch)

const response = await fetch('http://localhost:3000/consultar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
        consulta: 'Recomendaciones para contraseñas seguras' 
    })
});
const data = await response.json();
console.log(data.respuesta);
console.log(data.recomendaciones);
3. Consulta con Python (Requests)

import requests

response = requests.post('http://localhost:3000/consultar', 
    json={'consulta': '¿Cómo implementar Zero Trust?'})
data = response.json()
print(data['respuesta'])
print(data['nivel_riesgo'])
4. Monitoreo Continuo

# Verificar salud del sistema cada 30 segundos
watch -n 30 curl -s http://localhost:3000/health | jq '.status'

# Obtener estadísticas
curl -s http://localhost:3000/stats | jq '.summary'
🛠️ Tecnologías
Backend
Node.js - Runtime JavaScript

Express.js - Framework web

Helmet.js - Seguridad de headers

CORS - Middleware CORS

Frontend
HTML5 - Estructura

CSS3 - Estilos y animaciones

JavaScript Vanilla - Interactividad

Fetch API - Comunicación con backend

Arquitectura
MVC - Modelo-Vista-Controlador

Singleton - Instancia única del motor

Middleware - Pipeline de Express
