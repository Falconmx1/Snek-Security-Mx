/**
 * Sistema de recomendaciones de seguridad
 * Basado en el perfil y contexto del usuario
 */

class RecommendationsSystem {
    constructor() {
        this.profiles = {
            developer: {
                name: 'Desarrollador',
                recommendations: [
                    'Usar SAST/DAST en el pipeline de CI/CD',
                    'Validar todas las entradas del usuario',
                    'Implementar logging y monitoreo de errores',
                    'Usar dependencias actualizadas y seguras',
                    'Realizar code reviews enfocados en seguridad',
                    'Usar variables de entorno para configuración sensible'
                ]
            },
            sysadmin: {
                name: 'Administrador de Sistemas',
                recommendations: [
                    'Mantener sistemas y parches actualizados',
                    'Configurar firewalls con reglas restrictivas',
                    'Implementar monitoreo de logs en tiempo real',
                    'Usar VPN para acceso remoto',
                    'Segmentar redes por zonas de seguridad',
                    'Automatizar backups y pruebas de restauración'
                ]
            },
            user: {
                name: 'Usuario Final',
                recommendations: [
                    'Usar contraseñas únicas y fuertes',
                    'Activar autenticación de dos factores',
                    'No abrir enlaces sospechosos en correos',
                    'Mantener software actualizado',
                    'Usar antivirus y firewall personal',
                    'Ser cauteloso con las descargas de internet'
                ]
            },
            manager: {
                name: 'Gestor / Gerente',
                recommendations: [
                    'Establecer políticas de seguridad claras',
                    'Capacitar al personal en ciberseguridad',
                    'Realizar auditorías de seguridad periódicas',
                    'Invertir en herramientas de seguridad',
                    'Tener un plan de respuesta a incidentes',
                    'Cumplir con normativas (GDPR, LOPD, ISO 27001)'
                ]
            }
        };
        
        this.contexts = {
            development: {
                name: 'Desarrollo',
                recommendations: [
                    'Entornos de desarrollo aislados',
                    'Control de versiones con políticas de branch',
                    'Revisión de dependencias vulnerables',
                    'Testing de seguridad automatizado'
                ]
            },
            production: {
                name: 'Producción',
                recommendations: [
                    'Monitoreo continuo 24/7',
                    'Incidentes con tiempos de respuesta definidos',
                    'Balanceo de carga y alta disponibilidad',
                    'Logs centralizados y análisis'
                ]
            },
            learning: {
                name: 'Aprendizaje',
                recommendations: [
                    'Cursos de ciberseguridad online (Coursera, Udemy)',
                    'Certificaciones (CEH, CISSP, CompTIA Security+)',
                    'CTF (Capture The Flag) para práctica',
                    'Seguir blogs y canales de seguridad'
                ]
            }
        };
    }
    
    /**
     * Detecta el perfil del usuario basado en palabras clave
     */
    detectProfile(keywords, text) {
        const textLower = text.toLowerCase();
        const profiles = [];
        
        if (keywords.some(k => ['dev', 'developer', 'programador', 'codigo', 'código'].includes(k)) ||
            textLower.includes('desarrollo') || textLower.includes('programación')) {
            profiles.push('developer');
        }
        
        if (keywords.some(k => ['sysadmin', 'admin', 'sistema', 'server', 'linux'].includes(k)) ||
            textLower.includes('servidor') || textLower.includes('infraestructura')) {
            profiles.push('sysadmin');
        }
        
        if (keywords.some(k => ['manager', 'gerente', 'director', 'responsable'].includes(k)) ||
            textLower.includes('gestión') || textLower.includes('política')) {
            profiles.push('manager');
        }
        
        // Si no hay perfil específico, asumir usuario final
        if (profiles.length === 0) {
            profiles.push('user');
        }
        
        return profiles;
    }
    
    /**
     * Detecta el contexto basado en palabras clave
     */
    detectContext(keywords, text) {
        const textLower = text.toLowerCase();
        const contexts = [];
        
        if (keywords.some(k => ['dev', 'desarrollo', 'code', 'programar'].includes(k)) ||
            textLower.includes('desarrollo') || textLower.includes('coding')) {
            contexts.push('development');
        }
        
        if (keywords.some(k => ['prod', 'producción', 'online', 'live'].includes(k)) ||
            textLower.includes('producción') || textLower.includes('en vivo')) {
            contexts.push('production');
        }
        
        if (keywords.some(k => ['aprender', 'estudiar', 'curso', 'certificación'].includes(k)) ||
            textLower.includes('aprendizaje') || textLower.includes('estudio')) {
            contexts.push('learning');
        }
        
        // Si no hay contexto específico
        if (contexts.length === 0) {
            contexts.push('development');
        }
        
        return contexts;
    }
    
    /**
     * Genera recomendaciones personalizadas
     */
    generateRecommendations(profileNames, contextNames) {
        let recommendations = [];
        
        // Agregar recomendaciones por perfil
        for (const profile of profileNames) {
            if (this.profiles[profile]) {
                recommendations = recommendations.concat(this.profiles[profile].recommendations);
            }
        }
        
        // Agregar recomendaciones por contexto
        for (const context of contextNames) {
            if (this.contexts[context]) {
                recommendations = recommendations.concat(this.contexts[context].recommendations);
            }
        }
        
        // Eliminar duplicados y limitar a 8
        const unique = [...new Set(recommendations)];
        return unique.slice(0, 8);
    }
    
    /**
     * Obtiene recomendaciones detalladas para un tema específico
     */
    getDetailedRecommendations(topic, level = 'Básico') {
        const detailed = {
            'contraseñas': {
                title: 'Gestión de Contraseñas',
                levels: {
                    'Básico': [
                        'Usa contraseñas de al menos 12 caracteres',
                        'Combina mayúsculas, minúsculas, números y símbolos',
                        'No uses información personal (fechas, nombres)'
                    ],
                    'Intermedio': [
                        'Usa un gestor de contraseñas (Bitwarden, 1Password)',
                        'Activa autenticación de dos factores',
                        'Cambia contraseñas cada 90 días en sistemas críticos'
                    ],
                    'Avanzado': [
                        'Implementa políticas de complejidad en AD',
                        'Usa autenticación sin contraseña (passkeys, FIDO2)',
                        'Monitorea brechas de contraseñas en dark web'
                    ]
                }
            },
            'firewall': {
                title: 'Configuración de Firewalls',
                levels: {
                    'Básico': [
                        'Activa el firewall del sistema operativo',
                        'Bloquea puertos no utilizados',
                        'Permite solo tráfico necesario'
                    ],
                    'Intermedio': [
                        'Configura reglas por defecto denegar',
                        'Implementa zonas DMZ para servidores públicos',
                        'Usa listas de IPs permitidas'
                    ],
                    'Avanzado': [
                        'Implementa NGFW con inspección profunda de paquetes',
                        'Configura IPS/IDS integrado',
                        'Centraliza logs en SIEM'
                    ]
                }
            }
        };
        
        // Buscar tema
        let found = null;
        for (const [key, value] of Object.entries(detailed)) {
            if (topic.includes(key)) {
                found = value;
                break;
            }
        }
        
        if (!found) return null;
        
        return {
            title: found.title,
            recommendations: found.levels[level] || found.levels['Básico']
        };
    }
}

module.exports = RecommendationsSystem;
