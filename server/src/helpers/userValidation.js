// solution for validating email was gotten from https://www.codeproject.com/Tips/492632/Email-Validation-in-JavaScript

const signUp = (req, res, next) => {
  const { email, username, password } = req.body;
  const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

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

const signIn = (req, res, next) => {
  const { email, password } = req.body;
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

export default {
  signUp,
  signIn
};