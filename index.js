require('dotenv').config(); // Cargar las variables de entorno
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const API_BASE_URL = "http://localhost:5001/api";
const app = express(); // Crear la aplicación de Express
const port = process.env.PORT || 5001;

// Middleware para analizar JSON y habilitar CORS
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.error('Error: La variable MONGODB_URI no está definida en el archivo .env.');
    process.exit(1); // Finaliza el proceso si no se encuentra la URI de MongoDB
}

mongoose.connect(mongoUri)
    .then(() => console.log('Conectado a la base de datos en MongoDB'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// Importar rutas
const tutoriaRoutes = require('./routes/tutoriaRoutes'); // Rutas de tutorías
const estudianteRoutes = require('./routes/estudianteRoutes'); // Rutas de estudiantes
const tutorRoutes = require('./routes/tutorRoutes'); // Rutas de tutores
const adminRoutes = require('./routes/adminRoutes'); // Rutas de administradores (NUEVO)

// Registrar las rutas
app.use('/api/tutorias', tutoriaRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/tutores', tutorRoutes);
app.use('/api/admins', adminRoutes); // Registrar rutas del administrador (NUEVO)

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

// URL base de la API

// Función para obtener todos los estudiantes
async function obtenerEstudiantes() {
    try {
        const response = await fetch(`${API_BASE_URL}/estudiantes`);
        if (!response.ok) {
            throw new Error("Error al obtener estudiantes");
        }
        const estudiantes = await response.json();
        console.log(estudiantes); // Verifica los datos en la consola
    } catch (error) {
        console.error(error.message);
    }
}

// Función para agregar un nuevo estudiante
async function agregarEstudiante(estudiante) {
    try {
        const response = await fetch(`${API_BASE_URL}/estudiantes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(estudiante),
        });

        if (!response.ok) {
            throw new Error("Error al agregar estudiante");
        }

        const nuevoEstudiante = await response.json();
        console.log("Estudiante agregado:", nuevoEstudiante);
    } catch (error) {
        console.error(error.message);
    }
}

// Función para eliminar un estudiante
async function eliminarEstudiante(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/estudiantes/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error al eliminar estudiante");
        }

        console.log("Estudiante eliminado correctamente");
    } catch (error) {
        console.error(error.message);
    }
}

// Funciones para manejar administradores (NUEVO)

// Función para obtener todos los administradores
async function obtenerAdministradores() {
    try {
        const response = await fetch(`${API_BASE_URL}/admins`);
        if (!response.ok) {
            throw new Error("Error al obtener administradores");
        }
        const administradores = await response.json();
        console.log("Administradores:", administradores);
    } catch (error) {
        console.error(error.message);
    }
}

// Función para agregar un nuevo administrador
async function agregarAdministrador(admin) {
    try {
        const response = await fetch(`${API_BASE_URL}/admins`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(admin),
        });

        if (!response.ok) {
            throw new Error("Error al agregar administrador");
        }

        const nuevoAdmin = await response.json();
        console.log("Administrador agregado:", nuevoAdmin);
    } catch (error) {
        console.error(error.message);
    }
}

// Función para eliminar un administrador
async function eliminarAdministrador(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/admins/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Error al eliminar administrador");
        }

        console.log("Administrador eliminado correctamente");
    } catch (error) {
        console.error(error.message);
    }
}
