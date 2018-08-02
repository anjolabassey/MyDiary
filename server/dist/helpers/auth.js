'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkAuth = function checkAuth(req, res, next) {
  var token = req.headers['x-access-token'] || req.body.token;
  if (token) {
    _jsonwebtoken2.default.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        res.status(401).json({
          status: 'Failed',
          message: 'Unauthorized',
          error: err.message
        });
      } else {
        req.body.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(400).json({
      status: 'Failed',
      message: 'No token entered'
    });
  }
};

exports.default = checkAuth;
//# sourceMappingURL=auth.js.map