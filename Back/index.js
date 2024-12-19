// Aquí puedes escribir el código principal de tu aplicación... 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/db');
const checkDb = require('./middleware/healthDbCheck')

const app = express();

// Conexión a la base de datos
conectarDB();

// Middlewares
app.use(express.json());
app.use(cors({
   origin: [process.env.ORIGIN_CORS_1, process.env.ORIGIN_CORS_2]
}))

// Rutas
app.use('/api', require('./routes/healthDbRoutes'))
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/roles', require('./routes/rolRoutes'));
app.use('/api/direcciones', require('./routes/direccionRoutes'));
app.use('/api/productos', require('./routes/productoRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));



// return res.json({ mensaje: 'msg', status: 0, type: 'Success:', dataRes: 'data to manipulate in front' });
// return res.json({ mensaje: 'msg', status: 0, type: 'Warning:', dataRes: 'data to manipulate in front' });
// return res.json({ mensaje: 'msg', status: 0, type: 'Error:', dataRes: 'data to manipulate in front' });