const ProductosReview = require('../models/reviewsModel');

// Crear una nueva reseña de producto
async function crearReview (req, res) {
    try {
        const nuevaReview = new ProductosReview(req.body);
        await nuevaReview.save();
        // res.status(201).json(nuevaReview);
        return res.json({ mensaje: 'Reseña creada correctamente', status: 201, type: 'Success:', dataRes: nuevaReview })
    } catch (error) {
        // res.status(500).json({ mensaje: 'Error al crear la reseña', error }) 
        return res.json({ mensaje: 'Error al crear la reseña', status: 500, type: 'Error:' })
    }
};

// Obtener todas las reseñas de un producto específico
async function obtenerReviewsPorProducto (req, res) {
    try {
        const reviews = await ProductosReview.find({ producto: req.params.productoId })
            .populate('producto')
            .populate('userReview');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las reseñas', error });
    }
};

// Obtener una reseña específica
async function obtenerReview (req, res) {
    try {
        const review = await ProductosReview.find({ userReview: req.params.id })
            .populate('producto')
            .populate('userReview');
        if (!review) {
            return res.status(404).json({ mensaje: 'Reseña no encontrada' });
        }
        // res.status(200).json(review);
        return res.json({ mensaje: 'Reseñas Del Usuario', status: 200, type: 'Success:', dataRes: review })
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la reseña', error });
    }
};

// Actualizar una reseña
async function actualizarReview (req, res) {
    try {
        const review = await ProductosReview.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!review) {
            return res.status(404).json({ mensaje: 'Reseña no encontrada' });
        }
        // res.status(200).json(review);
        return res.json({ mensaje: 'Reseña actualizada', status: 200, type: 'Success:', dataRes: review })
    } catch (error) {
        // res.status(500).json({ mensaje: 'Error al actualizar la reseña', error });
        return res.json({ mensaje: 'Error al actualizar la reseña', status: 500, type: 'Error:' })
    }
};

// Eliminar una reseña
async function eliminarReview (req, res) {
    try {
        const review = await ProductosReview.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({ mensaje: 'Reseña no encontrada' });
        }
        // res.status(200).json({ mensaje: 'Reseña eliminada correctamente' });
        return res.json({ mensaje: 'Reseña eliminada correctamente', status: 200, type: 'Success:' })
    } catch (error) {
        // res.status(500).json({ mensaje: 'Error al eliminar la reseña', error });
        return res.json({ mensaje: 'Error al eliminar la reseña', status: 500, type: 'Error:' })
    }
};

module.exports = { crearReview, obtenerReviewsPorProducto, obtenerReview, actualizarReview, eliminarReview }