'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _routes = require('./routes/routes');

var _routes2 = _interopRequireDefault(_routes);

var _database = require('./models/database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import http from 'http';
require('dotenv').config();

var port = process.env.PORT || 4000;

// setup express app
var app = (0, _express2.default)();

// setup  server
// app.server = http.createServer(app);

// start db
(0, _database.db)();

app.use((0, _morgan2.default)('dev'));

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  return res.json({
    message: 'Welcome to MyDiary'
  });
});

// api routes
app.use('/api/v1', _routes2.default);

app.all('/*', function (req, res) {
  res.status(404).json({ message: 'not found' });
});

// listen for requests
app.listen(port, function () {
  console.log('Started on port ' + port);
});

exports.default = app;
//# sourceMappingURL=index.js.map