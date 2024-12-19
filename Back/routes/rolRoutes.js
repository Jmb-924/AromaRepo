// Aquí puedes escribir tus rutas... 
const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

// Rutas de roles
router.post('/crear', rolController.crearRol);
router.get('/obtener', rolController.obtenerRoles);
router.put('/actualizar/:id', rolController.actualizarRol);
router.delete('/eliminar/:id', rolController.eliminarRol);

module.exports = router;
