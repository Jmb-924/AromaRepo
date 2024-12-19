// Aquí puedes escribir tus modelos... 
const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
    nameRol: {
        type: String,
        required: true,
        unique: true
    }
});

const Rol = mongoose.model('Rol', rolSchema);

module.exports = Rol;


// {
//     "4dm1n": "664dbc3009c4202ca4e3694c",
//     "u5u4r10": "664dbc5309c4202ca4e3694f",
//     "t13nd4": "664dbcac09c4202ca4e36953",

// }