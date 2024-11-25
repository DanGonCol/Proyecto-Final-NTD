const mongoose = require('mongoose');

const tutoriaSchema = new mongoose.Schema({
    estudiante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Estudiante', 
        required: true,
    },
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tutor', 
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
    },
    tema: {
        type: String,
        required: true,
    },
    ubicacion: { // Campo opcional agregado
        type: String,
        required: false,
    },
}, {
    timestamps: true, 
});

const Tutoria = mongoose.model('Tutoria', tutoriaSchema);
module.exports = Tutoria;
