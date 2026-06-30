const jwt = require('jsonwebtoken');
const SEGREDO = 'segredo_projeto_final';

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ erro: 'Token ausente.' });
  const token = header.startsWith('Bearer ') ? header.slice(7) : header;
  jwt.verify(token, SEGREDO, (err, decoded) => {
    if (err) return res.status(401).json({ erro: 'Token inválido.' });
    req.userId = decoded.id;
    next();
  });
};
module.exports.SEGREDO = SEGREDO;
