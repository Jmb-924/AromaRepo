// Aquí puedes escribir tus rutas... 
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas de usuarios
router.post('/crear', usuarioController.crearUsuario);
router.get('/obtener', authMiddleware, usuarioController.obtenerUsuarios);
router.get('/obtener/:id', authMiddleware, usuarioController.obtenerUsuario);
router.put('/actualizar/:id', authMiddleware, usuarioController.actualizarUsuario);
router.delete('/eliminar/:id', authMiddleware, usuarioController.eliminarUsuario);

router.post('/iniciar-sesion', usuarioController.iniciarSesion);
router.post('/recuperar-contrasena', usuarioController.solicitarRecuperacionContraseña);
router.post('/reset-contrasena/', usuarioController.resetearContraseña);
// Rutas de roles y direcciones (completar de manera similar)

module.exports = router;