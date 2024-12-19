// Aquí puedes escribir tus middlewares... 
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // console.log("a: " + authHeader) // El token se muestra en consola
    const token = authHeader.split(' ')[1];
    // console.log("b:" + token) // El token se muestra

    if (!token) {
        return res.status(401).json({ mensaje: 'hola, no estas', });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Error de verificación del token:", err);
            return res.status(403).json({ mensaje: 'hola, no estas autorizado' }); // Siempre me sale el error
        }
        req.user = user;
        next();
    });
};

module.exports = authMiddleware;
