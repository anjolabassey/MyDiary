import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.body.token;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
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


export default checkAuth;