import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db, client } from '../models/database';

const newToken = (user) => {
  return jwt.sign({
    iss: 'MyDiary',
    sub: user.rows[0].user_id,
    iat: new Date().getTime(),
    exp: Math.floor(Date.now() / 1000 + (60 * 60))
  }, process.env.SECRET_KEY);
};

/**
 *
 * @class Usercontroller
 */
class Usercontroller {
  /**
   * Registers the user to the app
   *
   * @param {object} req
   * @param {object} res
   *
   * @returns {object} success object or error object
   * @memberof Usercontroller
   */
  signup(req, res) {
    const { email, username, password } = req.body;
    const hashed = bcrypt.hashSync(password, 10);
    client.query('INSERT INTO users (email, username, password) VALUES ( $1, $2, $3) RETURNING *', [email, username, hashed], (err, resp) => {
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
  signin(req, res) {
    const { email, password } = req.body;
    client.query(`SELECT * FROM users WHERE email ='${email}'`, (err, resp) => {
      if (err) {
        return res.status(400).json({
          status: 'Failed',
          message: 'Wrong email or password, please try again' 
        });
      } else if (resp.rowCount === 0) {
        return res.status(400).json({
          status: 'Failed',
          message: 'This email address does not have an account' 
        });
      } else {
        if (bcrypt.compareSync(password, resp.rows[0].password)) {
          return res.json({
            status: 'Success',
            message: `${resp.rows[0].email} is signed in`,
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
}

export default new Usercontroller();