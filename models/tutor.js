const mongoose = require('mongoose');

const tutorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    materia: {
        type: String,
        required: true,
    },
    nivelEducativo: { // Campo opcional
        type: String,
        required: false,
    },
}, {
    timestamps: true, // Correctamente definido aquí
});

// Definir y exportar el modelo
const Tutor = mongoose.model('Tutor', tutorSchema);
module.exports = Tutor;
