// Aquí puedes escribir tus modelos... 
const mongoose = require('mongoose');

const direccionSchema = new mongoose.Schema({
    departamento: {
        type: String,
        required: true
    },
    municipio: {
        type: String,
        required: true
    },
    dir: {
        type: String,
        required: true
    },
    //[0="domicilio", 1="tienda"]
    tipoDir: {
        type: Number,
        default: 0
    },
    observaciones: String,
    userDir: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

const Direccion = mongoose.model('Direccion', direccionSchema);

module.exports = Direccion;
