'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _entries = require('../controllers/entries');

var _entries2 = _interopRequireDefault(_entries);

var _users = require('../controllers/users');

var _users2 = _interopRequireDefault(_users);

var _auth = require('../helpers/auth');

var _auth2 = _interopRequireDefault(_auth);

var _entryValidation = require('../helpers/entryValidation');

var _entryValidation2 = _interopRequireDefault(_entryValidation);

var _userValidation = require('../helpers/userValidation');

var _userValidation2 = _interopRequireDefault(_userValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/entries', _auth2.default, _entryValidation2.default, _entries2.default.addEntry);
router.get('/entries', _auth2.default, _entries2.default.getAllEntries);
router.get('/entries/:id', _auth2.default, _entries2.default.getOneEntry);
router.put('/entries/:id', _auth2.default, _entryValidation2.default, _entries2.default.modifyEntry);
router.delete('/entries/:id', _auth2.default, _entries2.default.deleteEntry);

router.post('/auth/signup', _userValidation2.default.signUp, _users2.default.signup);
router.post('/auth/signin', _userValidation2.default.signIn, _users2.default.signin);

exports.default = router;
//# sourceMappingURL=routes.js.map