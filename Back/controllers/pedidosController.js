const Pedido = require('../models/pedidosModel');

// Crear un nuevo pedido
async function crearPedido (req, res) {
    try {
        const nuevoPedido = new Pedido(req.body);
        await nuevoPedido.save();
        res.status(201).json({ mensaje: 'Pedido creado exitosamente', pedido: nuevoPedido });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el pedido' });
    }
};

// Obtener todos los pedidos
async function obtenerPedidos (req, res) {
    try {
        const pedidos = await Pedido.find().populate('productos.id').populate('userPedido');
        res.status(200).json(pedidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los pedidos' });
    }
};

// Obtener pedidos por ID de usuario
async function obtenerPedidoPorUserId (req, res) {
    try {
        const pedido = await Pedido.find({ userPedido: req.params.id }).populate('productos.id').populate('userPedido');
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
        res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el pedido' });
    }
};

// Obtener un pedido por ID
async function obtenerPedidoPorId (req, res) {
    try {
        const pedido = await Pedido.findById(req.params.id).populate('productos.id').populate('userPedido');
        if (!pedido) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
        res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el pedido' });
    }
};

// Actualizar un pedido por ID
async function actualizarPedido (req, res) {
    try {
        const pedidoActualizado = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pedidoActualizado) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
        res.status(200).json({ mensaje: 'Pedido actualizado exitosamente', pedido: pedidoActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar el pedido' });
    }
};

// Eliminar un pedido por ID
async function eliminarPedido (req, res) {
    try {
        const pedidoEliminado = await Pedido.findByIdAndDelete(req.params.id);
        if (!pedidoEliminado) {
            return res.status(404).json({ mensaje: 'Pedido no encontrado' });
        }
        res.status(200).json({ mensaje: 'Pedido eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el pedido' });
    }
};

module.exports = { crearPedido, obtenerPedidos, obtenerPedidoPorUserId, obtenerPedidoPorId, actualizarPedido, eliminarPedido }