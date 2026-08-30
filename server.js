const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// Importar motor de IA propio (sin OpenAI)
const { processConsultation } = require('./src/ia-engine');
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
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        ...status
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

        // Procesar con el motor de IA propio
        const resultado = await processConsultation(consulta.trim());

        // Respuesta exitosa
        res.status(200).json({
            success: true,
            consulta: consulta,
            respuesta: resultado.respuesta,
            recomendaciones: resultado.recomendaciones || [],
            nivel_riesgo: resultado.nivel_riesgo || 'Bajo',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error en /consultar:', error);
        res.status(500).json({
            error: 'Error interno del servidor',
            message: 'No se pudo procesar la consulta en este momento'
        });
    }
});

/**
 * Ruta 404 - Manejo de rutas no encontradas
 */
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        message: 'La ruta solicitada no existe en el servidor'
    });
});

/**
 * Manejador de errores global
 */
app.use((err, req, res, next) => {
    console.error('Error no manejado:', err);
    res.status(500).json({
        error: 'Error del servidor',
        message: 'Ocurrió un error inesperado'
    });
});

// ============ INICIAR SERVIDOR ============

app.listen(PORT, () => {
    console.log(`🐍 Snek Security Mx`);
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📡 API disponible en POST /consultar`);
    console.log(`❤️  Health check en GET /health`);
});

// Exportar para pruebas
module.exports = app;
