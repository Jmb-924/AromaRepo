const bcrypt = require('bcryptjs');

// Generar una clave aleatoria para JWT_SECRET
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash('tu_clave_secreta', salt, (err, hash) => {
    if (err) throw err;
    console.log('JWT_SECRET:', hash);
  });
});

// Generar una clave aleatoria para JWT_RESET_SECRET
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash('tu_clave_secreta_para_reset', salt, (err, hash) => {
    if (err) throw err;
    console.log('JWT_RESET_SECRET:', hash);
  });
});

console.log(bcrypt)