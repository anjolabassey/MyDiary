'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var entryValidation = function entryValidation(req, res, next) {
  var _req$body = req.body,
      title = _req$body.title,
      body = _req$body.body;

  if (!title) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please enter entry title field'
    });
  } else if (!body) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please enter entry body field'
    });
  } else if (title.trim().length < 1) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Empty spaces are not valid, please enter Entry title'
    });
  } else if (body.trim().length < 1) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Empty spaces are not valid, please enter Entry body'
    });
  } else {
    next();
  }
};

exports.default = entryValidation;
//# sourceMappingURL=entryValidation.js.map