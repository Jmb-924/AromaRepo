const mongoose = require('mongoose');

async function checkDatabaseHealth (req, res) {
    try {
        // Realizamos una consulta simple a la base de datos para verificar su estado
        await mongoose.connection.db.admin().ping();
        res.status(200).json({ mensaje: 'La base de datos está funcionando correctamente' });
    } catch (error) {
        console.error('Error al comprobar la salud de la base de datos:', error);
        res.status(500).json({ mensaje: 'La base de datos no está disponible' });
    }
};

module.exports = { checkDatabaseHealth }