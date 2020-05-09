var jwt = require('jsonwebtoken');
require('dotenv/config');

function verifyJWT(req, res, next){
  var token = req.headers.authorization;
  
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  var [, token] = token.split(' ');

  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.user_id = decoded.id;
    next();
  });
}
module.exports = verifyJWT