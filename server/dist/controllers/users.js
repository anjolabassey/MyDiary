'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _database = require('../models/database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var newToken = function newToken(user) {
  return _jsonwebtoken2.default.sign({
    iss: 'MyDiary',
    sub: user.rows[0].user_id,
    iat: new Date().getTime(),
    exp: Math.floor(Date.now() / 1000 + 60 * 60)
  }, process.env.SECRET_KEY);
};

/**
 *
 * @class Usercontroller
 */

var Usercontroller = function () {
  function Usercontroller() {
    _classCallCheck(this, Usercontroller);
  }

  _createClass(Usercontroller, [{
    key: 'signup',

    /**
     * Registers the user to the app
     *
     * @param {object} req
     * @param {object} res
     *
     * @returns {object} success object or error object
     * @memberof Usercontroller
     */
    value: function signup(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          username = _req$body.username,
          password = _req$body.password;

      var hashed = _bcrypt2.default.hashSync(password, 10);
      _database.client.query('INSERT INTO users (email, username, password) VALUES ( $1, $2, $3) RETURNING *', [email, username, hashed], function (err, resp) {
        if (err) {
          return res.status(409).json({
            status: 'Failed',
            message: 'This email address already exists'
          });
        } else {
          return res.status(201).json({
            status: 'Success',
            user: resp.rows[0].email
          });
        }
      });
    }

    /**
    * Signs the user into the app
    *
    * @param {object} req
    * @param {object} res
    *
    * @returns {object} success object or error object
    *
    * @memberof Usercontroller
    */

  }, {
    key: 'signin',
    value: function signin(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      _database.client.query('SELECT * FROM users WHERE email =\'' + email + '\'', function (err, resp) {
        if (err) {
          return res.status(400).json({
            status: 'Failed',
            message: 'Wrong email or password, please try again'
          });
        } else if (resp.rowCount === 0) {
          return res.status(404).json({
            status: 'Failed',
            message: 'This email address does not have an account'
          });
        } else {
          if (_bcrypt2.default.compareSync(password, resp.rows[0].password)) {
            return res.status(200).json({
              status: 'Success',
              message: resp.rows[0].email + ' is signed in',
              token: newToken(resp)
            });
          } else {
            return res.status(400).json({
              status: 'Failed',
              messsage: 'Incorrect password'
            });
          }
        }
      });
    }
  }]);

  return Usercontroller;
}();

exports.default = new Usercontroller();
//# sourceMappingURL=users.js.map