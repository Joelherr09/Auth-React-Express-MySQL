// equipos.js
const express = require('express');
const router = express.Router();

// Simulación de una base de datos o servicio
let equipos = [
    { id: 1, nombre: 'Equipo A' },
    { id: 2, nombre: 'Equipo B' },
];

// Obtener todos los equipos
router.get('/', (req, res) => {
    res.json(equipos);
});

// Obtener un equipo por ID
router.get('/:id', (req, res) => {
    const equipo = equipos.find(e => e.id === parseInt(req.params.id));
    if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
    res.json(equipo);
});

// Crear un nuevo equipo
router.post('/', (req, res) => {
    const nuevoEquipo = {
        id: equipos.length + 1,
        nombre: req.body.nombre
    };
    equipos.push(nuevoEquipo);
    res.status(201).json(nuevoEquipo);
});

// Actualizar un equipo
router.put('/:id', (req, res) => {
    const equipo = equipos.find(e => e.id === parseInt(req.params.id));
    if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });

    equipo.nombre = req.body.nombre;
    res.json(equipo);
});

// Eliminar un equipo
router.delete('/:id', (req, res) => {
    const equipoIndex = equipos.findIndex(e => e.id === parseInt(req.params.id));
    if (equipoIndex === -1) return res.status(404).json({ message: 'Equipo no encontrado' });

    equipos.splice(equipoIndex, 1);
    res.status(204).send();
});

module.exports = router;