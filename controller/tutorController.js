const Tutor = require('../models/tutor');

// Obtener todos los tutores
const getTutores = async (req, res) => {
    try {
        const tutores = await Tutor.find();
        res.json(tutores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo tutor
const createTutor = async (req, res) => {
    const newTutor = new Tutor(req.body);
    try {
        await newTutor.save();
        res.status(201).json(newTutor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un tutor
const updateTutor = async (req, res) => {
    try {
        const updatedTutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTutor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un tutor
const deleteTutor = async (req, res) => {
    try {
        await Tutor.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTutores,
    createTutor,
    updateTutor,
    deleteTutor,
};