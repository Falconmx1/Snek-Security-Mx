/**
 * Reglas de seguridad para Snek Security Mx
 * Motor de reglas propio (sin IA externa)
 */

class SecurityRules {
    constructor() {
        // Base de conocimiento de seguridad
        this.rules = {
            owasp: {
                keywords: ['owasp', 'top 10', 'top ten', 'owasp top'],
                response: 'OWASP Top 10 es un estándar de concientización sobre seguridad en aplicaciones web. Los principales riesgos son: 1) Control de acceso roto, 2) Fallas criptográficas, 3) Inyección, 4) Diseño inseguro, 5) Configuración incorrecta, 6) Componentes vulnerables, 7) Fallas de identificación, 8) Fallas de software, 9) Monitoreo insuficiente, 10) Falsificación de solicitudes del lado del servidor.',
                recommendations: [
                    'Implementar autenticación robusta (OAuth2, JWT)',
                    'Usar HTTPS en todos los entornos',
                    'Validar todas las entradas de usuario',
                    'Realizar pruebas de penetración regularmente',
                    'Mantener actualizados todos los componentes'
                ],
                riskLevel: 'Medio'
            },
            
            injection: {
                keywords: ['inyección', 'sql', 'sql injection', 'no sql', 'command injection'],
                response: 'Las inyecciones ocurren cuando datos no confiables se envían a un intérprete como parte de un comando o consulta. Las más comunes son SQL, NoSQL, OS Command y LDAP injection.',
                recommendations: [
                    'Usar consultas parametrizadas (prepared statements)',
                    'Validar y sanitizar todas las entradas',
                    'Implementar WAF (Web Application Firewall)',
                    'Limitar privilegios de la base de datos',
                    'Auditar logs de acceso y errores'
                ],
                riskLevel: 'Alto'
            },
            
            phishing: {
                keywords: ['phishing', 'suplantación', 'correo', 'email fraud'],
                response: 'El phishing es una técnica de ingeniería social donde los atacantes se hacen pasar por entidades confiables para obtener información sensible.',
                recommendations: [
                    'Capacitar a usuarios sobre detección de phishing',
                    'Implementar autenticación de dos factores (2FA)',
                    'Usar filtros antiphishing en correo',
                    'Verificar URLs antes de hacer clic',
                    'No compartir información sensible por correo'
                ],
                riskLevel: 'Alto'
            },
            
            malware: {
                keywords: ['malware', 'virus', 'ransomware', 'trojan', 'spyware'],
                response: 'El malware es software malicioso diseñado para dañar o infiltrarse en sistemas. Incluye virus, ransomware, troyanos, spyware y adware.',
                recommendations: [
                    'Mantener antivirus actualizado',
                    'No descargar software de fuentes no oficiales',
                    'Implementar políticas de privilegios mínimos',
                    'Realizar backups periódicos',
                    'Monitorear actividad sospechosa en la red'
                ],
                riskLevel: 'Crítico'
            },
            
            authentication: {
                keywords: ['autenticación', 'login', 'contraseña', 'password', 'mfa', '2fa'],
                response: 'La autenticación es el proceso de verificar la identidad de un usuario. Las fallas en autenticación son una de las principales causas de brechas de seguridad.',
                recommendations: [
                    'Implementar autenticación multifactor (MFA)',
                    'Usar contraseñas fuertes (12+ caracteres)',
                    'Almacenar contraseñas con hashing seguro (bcrypt, Argon2)',
                    'Limitar intentos de login',
                    'Usar sesiones seguras con expiración'
                ],
                riskLevel: 'Medio'
            },
            
            encryption: {
                keywords: ['cifrado', 'encriptación', 'ssl', 'tls', 'https', 'certificado'],
                response: 'El cifrado protege datos en tránsito y en reposo mediante algoritmos criptográficos. SSL/TLS es el estándar para comunicaciones seguras en web.',
                recommendations: [
                    'Usar TLS 1.3 o superior',
                    'Configurar HSTS (HTTP Strict Transport Security)',
                    'Cifrar datos sensibles en reposo (AES-256)',
                    'Rotar certificados periódicamente',
                    'Usar algoritmos criptográficos modernos'
                ],
                riskLevel: 'Medio'
            },
            
            firewall: {
                keywords: ['firewall', 'cortafuegos', 'waf', 'seguridad red'],
                response: 'Un firewall es un sistema de seguridad que controla el tráfico de red basado en reglas predefinidas. Es una capa fundamental de seguridad perimetral.',
                recommendations: [
                    'Configurar reglas de firewall por defecto denegar',
                    'Implementar WAF para aplicaciones web',
                    'Monitorear logs de firewall',
                    'Actualizar reglas según amenazas emergentes',
                    'Segmentar redes con firewalls internos'
                ],
                riskLevel: 'Medio'
            },
            
            password: {
                keywords: ['contraseña', 'password', 'passphrase'],
                response: 'La gestión de contraseñas es crítica para la seguridad. Las contraseñas débiles son la puerta de entrada más común para atacantes.',
                recommendations: [
                    'Usar contraseñas largas (mínimo 12 caracteres)',
                    'Combinar mayúsculas, minúsculas, números y símbolos',
                    'No reutilizar contraseñas',
                    'Usar un gestor de contraseñas',
                    'Activar 2FA siempre que sea posible'
                ],
                riskLevel: 'Medio'
            },
            
            zero: {
                keywords: ['zero trust', 'confianza cero', 'zero-trust'],
                response: 'Zero Trust es un modelo de seguridad que asume que ninguna entidad es confiable por defecto, ni dentro ni fuera de la red. Verifica cada solicitud como si viniera de una red abierta.',
                recommendations: [
                    'Implementar autenticación y autorización en cada paso',
                    'Microsegmentación de redes',
                    'Monitoreo continuo de actividades',
                    'Políticas de acceso basadas en el principio de mínimo privilegio',
                    'Cifrar todo el tráfico, incluso interno'
                ],
                riskLevel: 'Bajo'
            },
            
            backup: {
                keywords: ['backup', 'copia seguridad', 'restauración', 'recuperación'],
                response: 'Los backups son copias de seguridad de datos críticos que permiten la recuperación ante pérdidas de información por ataques, fallos o desastres.',
                recommendations: [
                    'Implementar la regla 3-2-1 (3 copias, 2 medios, 1 offsite)',
                    'Automatizar backups diarios',
                    'Probar restauración periódicamente',
                    'Cifrar los backups',
                    'Mantener backups offline contra ransomware'
                ],
                riskLevel: 'Medio'
            }
        };
    }
    
    /**
     * Busca reglas que coincidan con el texto de consulta
     */
    findMatchingRules(text) {
        const normalized = text.toLowerCase();
        const matches = [];
        
        for (const [key, rule] of Object.entries(this.rules)) {
            if (rule.keywords.some(kw => normalized.includes(kw))) {
                matches.push({
                    key: key,
                    ...rule
                });
            }
        }
        
        return matches;
    }
    
    /**
     * Obtiene recomendaciones generales por defecto
     */
    getDefaultRecommendations() {
        return [
            'Mantener todo el software actualizado',
            'Usar autenticación multifactor',
            'Implementar backups regulares',
            'Capacitar al personal en seguridad',
            'Realizar auditorías periódicas'
        ];
    }
    
    /**
     * Combina reglas múltiples si hay varias coincidencias
     */
    combineRules(matches) {
        if (matches.length === 0) {
            return {
                response: 'No tengo información específica sobre ese tema. Te recomiendo consultar fuentes oficiales de seguridad como OWASP, NIST o el INCIBE.',
                recommendations: this.getDefaultRecommendations(),
                riskLevel: 'Bajo'
            };
        }
        
        // Si hay múltiples matches, combinar respuestas
        let response = matches.map(m => m.response).join(' ');
        const recommendations = [...new Set(matches.flatMap(m => m.recommendations))];
        const riskLevels = matches.map(m => m.riskLevel);
        const priority = this.getPriorityRisk(riskLevels);
        
        return {
            response: response,
            recommendations: recommendations.slice(0, 6),
            riskLevel: priority
        };
    }
    
    /**
     * Obtiene el nivel de riesgo más alto
     */
    getPriorityRisk(levels) {
        const priority = { 'Bajo': 1, 'Medio': 2, 'Alto': 3, 'Crítico': 4 };
        let max = 'Bajo';
        let maxValue = 0;
        
        for (const level of levels) {
            if (priority[level] > maxValue) {
                maxValue = priority[level];
                max = level;
            }
        }
        
        return max;
    }
}

module.exports = SecurityRules;
