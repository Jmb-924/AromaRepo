// Aquí puedes escribir tu lógica de controladores... 
const Rol = require('../models/rolModel');

async function crearRol(req, res) {
    try {
        const { nameRol } = req.body;

        const rolExistente = await Rol.findOne({ nameRol });
        if (rolExistente) {
            return res.status(400).json({ mensaje: 'El rol ya existe' });
        }

        const nuevoRol = new Rol({ nameRol });
        await nuevoRol.save();

        res.status(201).json({ mensaje: 'Rol creado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al crear el rol' });
    }
}

async function obtenerRoles(req, res) {
    try {
        const roles = await Rol.find();
        res.json(roles);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener los roles' });
    }
}

async function actualizarRol(req, res) {
    try {
        const { id } = req.params;
        const { nameRol } = req.body;

        const rolActualizado = await Rol.findByIdAndUpdate(id, { nameRol }, { new: true });

        if (!rolActualizado) {
            return res.status(404).json({ mensaje: 'Rol no encontrado' });
        }

        res.json({ mensaje: 'Rol actualizado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al actualizar el rol' });
    }
}

async function eliminarRol(req, res) {
    try {
        const { id } = req.params;
        
        const rolEliminado = await Rol.findByIdAndDelete(id);

        if (!rolEliminado) {
            return res.status(404).json({ mensaje: 'Rol no encontrado' });
        }

        res.json({ mensaje: 'Rol eliminado exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al eliminar el rol' });
    }
}

module.exports = { crearRol, obtenerRoles, actualizarRol, eliminarRol };
