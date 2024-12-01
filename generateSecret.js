const crypto = require('crypto');

// Gerando uma chave secreta de 256 bits (32 bytes)
const secret = crypto.randomBytes(32).toString('hex');

console.log(secret);