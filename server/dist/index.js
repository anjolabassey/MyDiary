'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes/routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.port || 4000;

// setup express app
var app = (0, _express2.default)();

// setup  server
app.server = _http2.default.createServer(app);

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  return res.json({
    message: 'Welcome to MyDiary'
  });
});

// api routes
app.use('/v1/entries', _routes2.default);

// listen for requests
app.server.listen(port, function () {
  console.log('Started on port ' + port);
});

exports.default = app;
//# sourceMappingURL=index.js.map