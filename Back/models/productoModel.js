// Aquí puedes escribir tus modelos... 
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    marca: {
        type: String,
        required: true
    },
    variedad: {
        type: String,
        required: true
    },
    proceso: String,
    origen: String,
    altura: String,
    productor: String,
    imgs: [{
        data: Buffer,
        contentType: String
    }],
    bags: [{
        tamano: String,
        precio: Number,
        molienda: [String]
    }],
    perfil: {
        tueste: String,
        cuerpo: String,
        notas: [{
            d1: String,
            d2: Number
        }],
        puntaje: Number
    },
    descripcion: String,
    // cardColor: ,
    recommended: Boolean,
    userCoffee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto;
