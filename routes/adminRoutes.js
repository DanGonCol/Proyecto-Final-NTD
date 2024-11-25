const express = require('express');
const router = express.Router();
const Admin = require('../models/admin'); // Importa el modelo de Admin
const bcrypt = require('bcrypt'); // Para encriptar contraseñas

// Crear un nuevo administrador
router.post('/', async (req, res) => {
  try {
    const { nombre, apellido, email, password } = req.body;

    // Validar que no falten campos
    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Validar si el correo ya existe
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar el administrador
    const newAdmin = new Admin({ nombre, apellido, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Administrador registrado exitosamente', admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el administrador', error: error.message });
  }
});

// Obtener todos los administradores
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los administradores', error: error.message });
  }
});

// Actualizar un administrador
router.put('/:id', async (req, res) => {
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }
    res.json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el administrador', error: error.message });
  }
});

// Eliminar un administrador
router.delete('/:id', async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }
    res.json({ message: 'Administrador eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el administrador', error: error.message });
  }
});

module.exports = router;
