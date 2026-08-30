const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// Importar motor de IA propio (sin OpenAI)
const { processConsultation, getEngineStats, getEngineSummary } = require('./src/ia-engine');
const { getHealthStatus } = require('./src/utils');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (interfaz web)
app.use(express.static(path.join(__dirname, 'public')));

// ============ RUTAS ============

/**
 * Ruta principal - Interfaz web
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * Ruta de salud - Verifica el estado del sistema
 */
app.get('/health', (req, res) => {
    const status = getHealthStatus();
    const stats = getEngineStats();
    
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        uptime: status.uptime,
        memory: status.memory,
        platform: status.platform,
        nodeVersion: status.nodeVersion,
        engine: {
            memorySize: stats.memorySize,
            historySize: stats.historySize,
            uniqueKeywords: stats.uniqueKeywords,
            lastConsultation: stats.lastConsultation
        }
    });
});

/**
 * Ruta de consulta - Procesa preguntas de seguridad
 * POST /consultar
 * Body: { consulta: "texto de la pregunta" }
 */
app.post('/consultar', async (req, res) => {
    try {
        const { consulta } = req.body;

        // Validar entrada
        if (!consulta || typeof consulta !== 'string' || consulta.trim().length === 0) {
            return res.status(400).json({
                error: 'Consulta inválida',
                message: 'Debes proporcionar una consulta de seguridad válida'
            });
        }

        // Validar longitud máxima (prevención de DoS)
        if (consulta.length > 1000) {
            return res.status(400).json({
                error: 'Consulta demasiado larga',
                message: 'La consulta no puede exceder los 1000 caracteres'
            });
        }

        // Procesar con el motor de IA propio
        const resultado = await processConsultation(consulta.trim());

        // Respuesta exitosa
        res.status(200).json({
            success: true,
            consulta: consulta,
            respuesta: resultado.respuesta,
            recomendaciones: resultado.recomendaciones || [],
            nivel_riesgo: resultado.nivel_riesgo || 'Bajo',
            palabras_clave: resultado.keywords_detectadas || [],
            perfil: resultado.perfil_detectado || 'Usuario general',
            contexto: resultado.contexto || 'General',
            confianza: resultado.confianza || 0.5,
            session_id: resultado.session_id,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error en /consultar:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'No se pudo procesar la consulta en este momento',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

/**
 * Ruta de estadísticas - Información del motor
 * GET /stats
 */
app.get('/stats', (req, res) => {
    try {
        const stats = getEngineStats();
        const summary = getEngineSummary();
        
        res.status(200).json({
            success: true,
            timestamp: new Date().toISOString(),
            stats: stats,
            summary: summary
        });
    } catch (error) {
        console.error('Error en /stats:', error);
        res.status(500).json({
            error: 'Error al obtener estadísticas',
            message: 'No se pudieron recuperar las estadísticas del motor'
        });
    }
});

/**
 * Ruta de resumen - Análisis de consultas
 * GET /summary
 */
app.get('/summary', (req, res) => {
    try {
        const summary = getEngineSummary();
        
        res.status(200).json({
            success: true,
            timestamp: new Date().toISOString(),
            ...summary
        });
    } catch (error) {
        console.error('Error en /summary:', error);
        res.status(500).json({
            error: 'Error al obtener resumen',
            message: 'No se pudo generar el resumen de consultas'
        });
    }
});

/**
 * Ruta de contexto - Obtener contexto de una sesión
 * GET /context/:sessionId
 */
app.get('/context/:sessionId', (req, res) => {
    try {
        const { sessionId } = req.params;
        
        if (!sessionId || sessionId.length === 0) {
            return res.status(400).json({
                error: 'ID de sesión inválido',
                message: 'Debes proporcionar un ID de sesión válido'
            });
        }
        
        const { iaEngine } = require('./src/ia-engine');
        const context = iaEngine.getContext(sessionId);
        
        if (!context) {
            return res.status(404).json({
                error: 'Sesión no encontrada',
                message: 'No se encontró contexto para el ID de sesión proporcionado'
            });
        }
        
        res.status(200).json({
            success: true,
            session_id: sessionId,
            context: context,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Error en /context:', error);
        res.status(500).json({
            error: 'Error al obtener contexto',
            message: 'No se pudo recuperar el contexto de la sesión'
        });
    }
});

/**
 * Ruta de versión - Información de la aplicación
 * GET /version
 */
app.get('/version', (req, res) => {
    res.status(200).json({
        name: 'Snek Security Mx',
        version: '1.0.0',
        description: 'Asistente de seguridad con IA para consultas y recomendaciones',
        author: 'Falconmx1',
        license: 'MIT',
        engine: 'Propio (sin APIs externas)',
        features: [
            'Motor de IA basado en reglas',
            'Recomendaciones personalizadas',
            'Detección de nivel de riesgo',
            'Análisis de palabras clave',
            'Memoria de contexto a corto plazo',
            'Sin dependencias externas de IA'
        ],
        timestamp: new Date().toISOString()
    });
});

/**
 * Ruta 404 - Manejo de rutas no encontradas
 */
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: 'La ruta solicitada no existe en el servidor',
        available_endpoints: [
            'GET /',
            'GET /health',
            'POST /consultar',
            'GET /stats',
            'GET /summary',
            'GET /context/:sessionId',
            'GET /version'
        ]
    });
});

/**
 * Manejador de errores global
 */
app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);
    res.status(500).json({
        error: 'Error del servidor',
        message: 'Ocurrió un error inesperado en el servidor',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ============ INICIAR SERVIDOR ============

app.listen(PORT, () => {
    console.log('🐍 ════════════════════════════════════════════');
    console.log('🐍  Snek Security Mx v1.0.0');
    console.log('🐍 ════════════════════════════════════════════');
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📡 API disponible en POST /consultar`);
    console.log(`❤️  Health check en GET /health`);
    console.log(`📊 Estadísticas en GET /stats`);
    console.log(`📋 Resumen en GET /summary`);
    console.log(`🔍 Contexto en GET /context/:sessionId`);
    console.log(`ℹ️  Versión en GET /version`);
    console.log('🐍 ════════════════════════════════════════════');
    console.log('🧠 Motor de IA: Propio (sin APIs externas)');
    console.log('🔒 Seguridad: Reglas propias + Recomendaciones');
    console.log('🐍 ════════════════════════════════════════════');
});

// Exportar para pruebas
module.exports = app;
