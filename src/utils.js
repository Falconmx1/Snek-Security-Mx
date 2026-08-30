/**
 * Utilidades generales para Snek Security Mx
 */

/**
 * Obtiene el estado de salud del sistema
 */
function getHealthStatus() {
    return {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        platform: process.platform,
        nodeVersion: process.version
    };
}

/**
 * Limpia y normaliza texto para análisis
 */
function normalizeText(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, ' ')
        .replace(/[^\w\sáéíóúñü]/g, '');
}

/**
 * Extrae palabras clave de un texto
 */
function extractKeywords(text) {
    const stopWords = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al', 
                       'y', 'o', 'pero', 'por', 'para', 'con', 'sin', 'sobre', 'entre', 'hasta',
                       'desde', 'durante', 'mediante', 'según', 'como', 'más', 'menos', 'muy',
                       'qué', 'quien', 'cual', 'cuando', 'donde', 'como', 'porque'];
    
    const palabras = text.toLowerCase().split(/\s+/);
    const keywords = palabras
        .filter(p => p.length > 2 && !stopWords.includes(p))
        .reduce((acc, p) => {
            acc[p] = (acc[p] || 0) + 1;
            return acc;
        }, {});
    
    return Object.keys(keywords).sort((a, b) => keywords[b] - keywords[a]);
}

/**
 * Detecta el nivel de riesgo basado en palabras clave
 */
function detectRiskLevel(keywords, context) {
    const highRisk = ['ataque', 'exploit', 'vulnerabilidad', 'crítico', 'emergencia', 'brecha', 'ransomware'];
    const mediumRisk = ['phishing', 'malware', 'virus', 'trojan', 'spyware', 'autenticación'];
    const lowRisk = ['consejo', 'recomendación', 'buena práctica', 'mejora', 'optimización'];
    
    let riskScore = 0;
    
    keywords.forEach(kw => {
        if (highRisk.some(risk => kw.includes(risk))) riskScore += 3;
        if (mediumRisk.some(risk => kw.includes(risk))) riskScore += 2;
        if (lowRisk.some(risk => kw.includes(risk))) riskScore += 1;
    });
    
    // Contexto adicional
    if (context.includes('producción') || context.includes('crítico')) riskScore += 1;
    if (context.includes('personal') || context.includes('privado')) riskScore += 1;
    
    if (riskScore >= 5) return 'Crítico';
    if (riskScore >= 3) return 'Alto';
    if (riskScore >= 2) return 'Medio';
    return 'Bajo';
}

/**
 * Valida que el texto no contenga inyección o código malicioso
 */
function sanitizeText(text) {
    // Remover posibles inyecciones
    return text
        .replace(/[<>{}()[\]\\;'"`]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .trim();
}

/**
 * Genera un ID único simple
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

module.exports = {
    getHealthStatus,
    normalizeText,
    extractKeywords,
    detectRiskLevel,
    sanitizeText,
    generateId
};
