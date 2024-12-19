// Aquí puedes escribir tu lógica de controladores... 
const Usuario = require('../models/usuarioModel');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


async function crearUsuario(req, res) {
    try {

        const usuarioMail = await Usuario.findOne({ correo: req.body.correo });
        if (usuarioMail) {
            return res.json({ mensaje: 'Correo En Uso', status: 201, type: 'Error:', dataRes: 'correo' });
        }
        const psw = req.body.contraseña
        const username = req.body.correo.split('@')[0]
        if (!req.body.username) {
            req.body.username = username
        }

        // req.body.phone = parseInt(req.body.phone.replace(/-/g, ''), 10)

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.contraseña, salt);
        req.body.contraseña = hashedPassword;

        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        return res.json({ mensaje: 'Usuario Creado Correctamente', status: 201, type: 'Success:', dataRes: { correo: req.body.correo, contraseña: psw } });
    } catch (error) {
        console.log(error);
        return res.json({ mensaje: `Error al crear el usuario: ${error}`, status: 500, type: 'Error:' })
    }
}

async function obtenerUsuarios(req, res) {
    try {
        const usuarios = await Usuario.find().populate('rol');
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener los usuarios' });
    }
}

async function obtenerUsuario(req, res) {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id).populate('rol');
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener el usuario' });
    }
}

async function actualizarUsuario(req, res) {
    try {
        const { id } = req.params;
        await Usuario.findByIdAndUpdate(id, req.body);
        return res.json({ mensaje: 'Usuario Actualizado Correctamente', status: 201, type: 'Success:', });
    } catch (error) {
        console.log(error);
        return res.json({ mensaje: `Error al Actualizar el usuario: ${error}`, status: 500, type: 'Error:' })
    }
}

async function eliminarUsuario(req, res) {
    try {
        const { id } = req.params;
        await Usuario.findByIdAndDelete(id);
        return res.json({ mensaje: 'Usuario Eliminado Correctamente', status: 201, type: 'Success:', });
    } catch (error) {
        console.log(error);
        return res.json({ mensaje: `Error al Eliminar el usuario: ${error}`, status: 500, type: 'Error:' })
    }
}


async function iniciarSesion(req, res) {
    try {
        const { correo, contraseña, recordar } = req.body;
        const usuario = await Usuario.findOne({ correo }).populate('rol');

        if (!usuario) {
            return res.json({ mensaje: 'Credenciales inválidas: Correo', status: 400, type: 'Error:', dataRes: 'correo' });
        }

        const esContraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!esContraseñaValida) {
            return res.json({ mensaje: 'Credenciales inválidas: Contraseña', status: 400, type: 'Error:', dataRes: 'password' });
        }

        const expiresIn = recordar ? '7d' : '3h'; // Duración del token

        const token = jwt.sign({ usuario: usuario }, process.env.JWT_SECRET, { expiresIn });

        return res.json({ mensaje: 'Acceso Autorizado', status: 200, type: 'Success:', dataRes: { userId: { id: usuario._id, r: usuario.rol.nameRol, s: usuario.status }, userInfo: token, expiredTime: expiresIn } });
    } catch (error) {
        console.log(error);
        return res.json({ mensaje: 'Error al iniciar sesión', status: 500, type: 'Error:' });
    }
}

async function solicitarRecuperacionContraseña(req, res) {
    try {
        const { correo } = req.body;
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({ mensaje: 'No existe una cuenta asociada a este correo' });
        }

        const token = jwt.sign({ usuario: usuario._id }, process.env.JWT_RESET_SECRET, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_CREDENTIAL, // Actualiza con tus credenciales de correo electrónico
                pass: process.env.PASS_CREDENTIAL // Actualiza con tu contraseña de correo electrónico
            }
        });

        const mailOptions = {
            from: process.env.MAIL_CREDENTIAL, // Actualiza con tu correo electrónico
            to: correo,
            subject: 'Recuperación de contraseña',
            html: `
                <p>Hola ${correo.split('@')[0]},</p>
                <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
                <a href="http://localhost:3000/reset-contraseña/${token}">Restablecer Contraseña</a>
                <p>Si no solicitaste esto, puedes ignorar este correo y tu contraseña seguirá siendo la misma.</p>
            `
        };

        const aa = await transporter.sendMail(mailOptions);
        if (aa) {
            console.log("b")
            return res.json({ mensaje: 'Se ha enviado un correo electrónico para restablecer la contraseña' });
        }
        console.log("F")
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al solicitar recuperación de contraseña' });
    }
}

async function resetearContraseña(req, res) {
    try {
        // const { token } = req.params;
        const { newPassword, token } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
        const usuario = await Usuario.findById(decoded.usuario);

        if (!usuario) {
            return res.status(400).json({ mensaje: 'Token inválido o expirado' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        usuario.contraseña = hashedPassword;
        await usuario.save();

        res.json({ mensaje: 'Contraseña restablecida exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al restablecer contraseña' });
    }
}



module.exports = { crearUsuario, obtenerUsuarios, obtenerUsuario, actualizarUsuario, eliminarUsuario, iniciarSesion, solicitarRecuperacionContraseña, resetearContraseña };
