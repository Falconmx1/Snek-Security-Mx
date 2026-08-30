/**
 * Motor de IA propio para Snek Security Mx
 * Sin APIs externas - Basado en reglas, heurística y NLP básico
 */

const SecurityRules = require('./security-rules');
const RecommendationsSystem = require('./recommendations');
const {
    normalizeText,
    extractKeywords,
    detectRiskLevel,
    sanitizeText
} = require('./utils');

class IAEngine {
    constructor() {
        this.securityRules = new SecurityRules();
        this.recommendationsSystem = new RecommendationsSystem();
        this.memory = new Map(); // Memoria a corto plazo para contexto
        this.consultationHistory = [];
    }
    
    /**
     * Procesa una consulta de seguridad
     */
    async processConsultation(text) {
        // 1. Sanitizar y limpiar texto
        const cleanText = sanitizeText(text);
        const normalized = normalizeText(cleanText);
        
        // 2. Extraer palabras clave
        const keywords = extractKeywords(normalized);
        
        // 3. Buscar reglas coincidentes
        const matches = this.securityRules.findMatchingRules(normalized);
        
        // 4. Generar respuesta basada en reglas
        let result;
        if (matches.length > 0) {
            result = this.securityRules.combineRules(matches);
        } else {
            // Si no hay coincidencias, usar respuesta genérica
            result = {
                response: 'No tengo información específica sobre ese tema en mi base de conocimientos. Te recomiendo consultar fuentes oficiales como OWASP, NIST, INCIBE o el CERT de tu país.',
                recommendations: this.securityRules.getDefaultRecommendations(),
                riskLevel: 'Bajo'
            };
        }
        
        // 5. Detectar perfil y contexto para recomendaciones personalizadas
        const profiles = this.recommendationsSystem.detectProfile(keywords, text);
        const contexts = this.recommendationsSystem.detectContext(keywords, text);
        
        // 6. Generar recomendaciones personalizadas
        const personalizedRecs = this.recommendationsSystem.generateRecommendations(
            profiles,
            contexts
        );
        
        // 7. Combinar recomendaciones de reglas + personalizadas
        const allRecommendations = [
            ...result.recommendations,
            ...personalizedRecs
        ];
        
        // 8. Detectar nivel de riesgo con mayor precisión
        const riskLevel = detectRiskLevel(keywords, text);
        
        // 9. Guardar en memoria de contexto
        const sessionId = Date.now().toString(36);
        this.memory.set(sessionId, {
            text: text,
            keywords: keywords,
            timestamp: Date.now(),
            riskLevel: riskLevel,
            profiles: profiles,
            contexts: contexts
        });
        
        // 10. Limpiar memoria vieja (más de 1 hora)
        this.cleanMemory();
        
        // 11. Registrar en historial
        this.consultationHistory.push({
            id: sessionId,
            text: text,
            timestamp: new Date().toISOString(),
            keywords: keywords,
            riskLevel: riskLevel
        });
        
        // 12. Limitar historial a 1000 entradas
        if (this.consultationHistory.length > 1000) {
            this.consultationHistory.shift();
        }
        
        // 13. Preparar respuesta final
        return {
            respuesta: this.formatResponse(result.response, matches.length),
            recomendaciones: [...new Set(allRecommendations)].slice(0, 6),
            nivel_riesgo: this.getHighestRisk(riskLevel, result.riskLevel),
            keywords_detectadas: keywords.slice(0, 10),
            perfil_detectado: profiles.map(p => this.recommendationsSystem.profiles[p]?.name || p).join(', '),
            contexto: contexts.map(c => this.recommendationsSystem.contexts[c]?.name || c).join(', '),
            session_id: sessionId,
            confianza: this.calculateConfidence(matches.length, keywords.length)
        };
    }
    
    /**
     * Formatea la respuesta para mejor legibilidad
     */
    formatResponse(response, matchCount) {
        if (matchCount === 0) {
            return response;
        }
        
        // Si hay múltiples matches, mejorar estructura
        if (matchCount > 1) {
            return response.replace(/\. /g, '. ');
        }
        
        return response;
    }
    
    /**
     * Obtiene el nivel de riesgo más alto entre dos fuentes
     */
    getHighestRisk(risk1, risk2) {
        const levels = { 'Bajo': 1, 'Medio': 2, 'Alto': 3, 'Crítico': 4 };
        const r1 = levels[risk1] || 1;
        const r2 = levels[risk2] || 1;
        
        if (r1 >= r2) return risk1;
        return risk2;
    }
    
    /**
     * Calcula la confianza de la respuesta
     */
    calculateConfidence(matchCount, keywordCount) {
        // Factor base: 0.3 por match + 0.05 por keyword
        let confidence = 0.3 + (matchCount * 0.2) + (keywordCount * 0.02);
        
        // Limitar entre 0.1 y 0.95
        return Math.min(0.95, Math.max(0.1, confidence));
    }
    
    /**
     * Limpia memoria a corto plazo (más de 1 hora)
     */
    cleanMemory() {
        const now = Date.now();
        const oneHour = 3600000;
        
        for (const [key, value] of this.memory.entries()) {
            if (now - value.timestamp > oneHour) {
                this.memory.delete(key);
            }
        }
    }
    
    /**
     * Obtiene estadísticas del motor
     */
    getStats() {
        return {
            memorySize: this.memory.size,
            historySize: this.consultationHistory.length,
            lastConsultation: this.consultationHistory.length > 0 ? 
                this.consultationHistory[this.consultationHistory.length - 1].timestamp : null,
            uniqueKeywords: [...new Set(this.consultationHistory.flatMap(h => h.keywords))].length
        };
    }
    
    /**
     * Obtiene el contexto de una sesión específica
     */
    getContext(sessionId) {
        return this.memory.get(sessionId) || null;
    }
    
    /**
     * Genera resumen de todas las consultas
     */
    getSummary() {
        if (this.consultationHistory.length === 0) {
            return 'No hay consultas registradas.';
        }
        
        const total = this.consultationHistory.length;
        const risks = this.consultationHistory.map(h => h.riskLevel);
        const riskCounts = risks.reduce((acc, r) => {
            acc[r] = (acc[r] || 0) + 1;
            return acc;
        }, {});
        
        // Palabras clave más comunes
        const allKeywords = this.consultationHistory.flatMap(h => h.keywords);
        const keywordCounts = allKeywords.reduce((acc, k) => {
            acc[k] = (acc[k] || 0) + 1;
            return acc;
        }, {});
        
        const topKeywords = Object.entries(keywordCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([k, v]) => `${k} (${v})`);
        
        return {
            totalConsultas: total,
            distribucionRiesgos: riskCounts,
            keywordsMasComunes: topKeywords,
            promedioConfianza: (this.consultationHistory.reduce((acc, h) => 
                acc + (h.confianza || 0), 0) / total).toFixed(2)
        };
    }
}

// Exportar instancia única (Singleton)
const iaEngine = new IAEngine();

/**
 * Función wrapper para procesar consultas
 */
async function processConsultation(text) {
    return iaEngine.processConsultation(text);
}

/**
 * Función para obtener estadísticas
 */
function getEngineStats() {
    return iaEngine.getStats();
}

/**
 * Función para obtener resumen
 */
function getEngineSummary() {
    return iaEngine.getSummary();
}

module.exports = {
    processConsultation,
    getEngineStats,
    getEngineSummary,
    IAEngine,
    iaEngine
};
