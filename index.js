var jwt = require('jsonwebtoken');

module.exports = function(secret) {
    return function(req, res, next) {
        let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'].split(' ')[1];
        if (token) {
          jwt.verify(token, secret, function(err, decoded) {
            if (err) {
              return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });
            } else {
              req.decoded = decoded;
              next();
            }
          });
        } else {
          return res.status(403).send({
              success: false,
              message: 'No token provided.'
          });
        }
    }
}
