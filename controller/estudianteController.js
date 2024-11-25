const Estudiante = require('../models/estudiante');

// Obtener todos los estudiantes
const getEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.json(estudiantes);
    } catch (error) {
       res.status(500).json({ message: 'Error al obtener los estudiantes', error: error.message });
    }
};

// Crear un nuevo estudiante
const createEstudiante = async (req, res) => {
    const newEstudiante = new Estudiante(req.body);
    try {
        await newEstudiante.save();
        res.status(201).json(newEstudiante);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un estudiante
const updateEstudiante = async (req, res) => {
    try {
        const updatedEstudiante = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEstudiante);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un estudiante
const deleteEstudiante = async (req, res) => {
    try {
        await Estudiante.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEstudiantes,
    createEstudiante,
    updateEstudiante,
    deleteEstudiante,
};
