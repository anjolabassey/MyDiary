'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _db = require('../db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/', function (req, res) {
  _db2.default.addOne(req.body);
  res.json({
    message: 'Entry added succesfully',
    error: false
  });
});

router.get('/', function (req, res) {
  _db2.default.getAll();
  res.json({
    entry: _db2.default.getAll(),
    message: 'View all entries',
    error: false
  });
});

router.get('/:id', function (req, res) {
  res.json({
    entry: _db2.default.getOne(Number(req.params.id)),
    message: 'View this entry'
  });
});

router.put('/:id', function (req, res) {
  req.body.id = Number(req.params.id);
  res.json({
    entry: _db2.default.modifyOne(req.body),
    message: 'Entry is successfully edited',
    error: false
  });
});

router.delete('/:id', function (req, res) {
  _db2.default.deleteOne(Number(req.params.id));
  res.json({
    message: 'Entry is successfully deleted',
    error: false
  });
});

exports.default = router;
//# sourceMappingURL=routes.js.map