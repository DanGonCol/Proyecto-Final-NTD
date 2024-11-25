const express = require('express');
const router = express.Router();
const Estudiante = require('../models/estudiante'); 

// Obtener todos los estudiantes
router.get('/', async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los estudiantes', error: error.message });
    }
});

// Obtener un estudiante por ID
router.get('/:id', async (req, res) => {
    console.log(`Obteniendo estudiante con ID: ${req.params.id}`);
    try {
        const estudiante = await Estudiante.findById(req.params.id);
        if (!estudiante) {
            console.log(`Estudiante con ID ${req.params.id} no encontrado`);
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        console.log('Estudiante encontrado:', estudiante);
        res.json(estudiante);
    } catch (error) {
        console.error('Error al buscar estudiante:', error.message);
        res.status(500).json({ message: 'Error al obtener el estudiante', error: error.message });
    }
});

// Crear un nuevo estudiante
router.post('/', async (req, res) => {
    const newEstudiante = new Estudiante(req.body);
    try {
        await newEstudiante.save();
        res.status(201).json(newEstudiante);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un estudiante por ID
router.put('/:id', async (req, res) => {
    try {
        const updatedEstudiante = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEstudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.json(updatedEstudiante);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un estudiante por ID
router.delete('/:id', async (req, res) => {
    try {
        const estudiante = await Estudiante.findByIdAndDelete(req.params.id);
        if (!estudiante) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.status(200).json({ message: 'Estudiante eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el estudiante', error: error.message });
    }
});

module.exports = router;
