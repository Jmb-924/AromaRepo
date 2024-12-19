// Aquí puedes escribir tus modelos... 
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    nombre: {
        type: String,
        required: false
    },
    apellidos: {
        type: String,
        required: false
    },
    phone: {
        type: Number,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    },
    //[0=desactivado, 1=activo, 2=en_proceso, 3=privilegio_tienda]
    status: {
        type: Number,
        default: 1,
    },
    rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rol',
        required: true
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
