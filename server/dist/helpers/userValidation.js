'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// solution for validating email was gotten from https://www.codeproject.com/Tips/492632/Email-Validation-in-JavaScript

var signUp = function signUp(req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      username = _req$body.username,
      password = _req$body.password;

  var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!email) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please enter your Email'
    });
  } else if (!username) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please enter your Username'
    });
  } else if (!password) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please enter your password'
    });
  } else if (email.trim().length < 1) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Empty spaces are not valid, please enter your Email address'
    });
  } else if (password.trim().length < 1) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Empty spaces are not valid, please enter your Password'
    });
  } else if (username.trim().length < 1) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Empty spaces are not valid, please enter your Username'
    });
  } else if (username === 'true' || username === 'false') {
    return res.status(400).json({
      status: 'Failed',
      message: 'Booleans cannot be entered'
    });
  } else if (password === 'true' || password === 'false') {
    return res.status(400).json({
      status: 'Failed',
      message: 'Booleans cannot be entered'
    });
  } else if (password.length < 8) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Your password must be at least 8 characters long'
    });
  } else if (re.test(email) === false) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please enter a valid email'
    });
  } else {
    next();
  }
};

var signIn = function signIn(req, res, next) {
  var _req$body2 = req.body,
      email = _req$body2.email,
      password = _req$body2.password;

  if (!email) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please enter your Email address'
    });
  } else if (!password) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Please enter your Password'
    });
  } else if (email.trim().length < 1) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Empty spaces are not valid, please enter your Email address'
    });
  } else if (password.trim().length < 1) {
    return res.status(400).json({
      status: 'Failed',
      message: 'Empty spaces are not valid, please enter  your Password'
    });
  } else {
    next();
  }
};

exports.default = {
  signUp: signUp,
  signIn: signIn
};
//# sourceMappingURL=userValidation.js.map