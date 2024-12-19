// Aquí puedes escribir tu lógica de controladores... 
const Direccion = require('../models/direccionModel');

async function crearDireccion(req, res) {
    try {
        const { departamento, municipio, dir, observaciones, tipoDir, userDir } = req.body;
        const validateExistences = await Direccion.find({ tipoDir: 1, userDir: userDir })

        if (tipoDir === 1 && validateExistences.length === 1) {
                return res.status(500).json({ mensaje: 'Error al crear la dirección' })
        }

        const nuevaDireccion = new Direccion({ departamento, municipio, dir, observaciones, tipoDir, userDir });
        await nuevaDireccion.save();

        res.status(201).json({ mensaje: 'Dirección creada exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al crear la dirección' });
    }
}

async function obtenerDirecciones(req, res) {
    try {
        const direcciones = await Direccion.find();
        res.json(direcciones);
    } catch (error) {
        console.log(error);
        // res.status(500).json({ mensaje: 'Error al obtener las direcciones' });
        return res.json({ mensaje: `Error al obtener las direcciones: ${error}`, status: 500, type: 'Error:',});
    }
}

async function obtenerDireccionesByUser(req, res) {
    try {
        const dirs = await Direccion.find({ userDir: req?.params?.id }).populate('userDir')
        if (!dirs) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
        res.status(200).json(dirs);
    } catch (error) {
        return res.json({ mensaje: `Error al obtener las direcciones: ${error}`, status: 500, type: 'Error:',});
    }   
}

async function actualizarDireccion(req, res) {
    try {
        const { id } = req.params;
        const { departamento, municipio, dir, observaciones, tipoDir, userDir } = req.body;

        const direccionActualizada = await Direccion.findByIdAndUpdate(id, {
            departamento,
            municipio,
            dir,
            observaciones,
            tipoDir,
            userDir
        }, { new: true });

        if (!direccionActualizada) {
            return res.status(404).json({ mensaje: 'Dirección no encontrada' });
        }

        res.json({ mensaje: 'Dirección actualizada exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al actualizar la dirección' });
    }
}

async function eliminarDireccion(req, res) {
    try {
        const { id } = req.params;
        
        const direccionEliminada = await Direccion.findByIdAndDelete(id);

        if (!direccionEliminada) {
            return res.status(404).json({ mensaje: 'Dirección no encontrada' });
        }

        res.json({ mensaje: 'Dirección eliminada exitosamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al eliminar la dirección' });
    }
}

module.exports = { crearDireccion, obtenerDirecciones, obtenerDireccionesByUser, actualizarDireccion, eliminarDireccion };
