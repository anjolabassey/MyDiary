// solution for validating email was gotten from https://www.codeproject.com/Tips/492632/Email-Validation-in-JavaScript

import bcrypt from 'bcrypt';
import { db, client } from '../models/database';

/**
 * @export
 * @class Entrycontroller
 */
class Usercontroller {
  contructor() {
  };
  /**
   * @static
   * @param {obj} req
   * @param {obj} res
   * @memberof Usercontroller
   */

 signup(req, res) {
    const { email, username, password } = req.body;
    const hashed = bcrypt.hashSync(password, 10);
    const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Please enter missing fields' });
    } else if (username === 'true' || username === 'false') {
      return res.status(400).json({ message: 'Booleans cannot be entered' });
    } else if (password === 'true' || password === 'false') {
      return res.status(400).json({ message: 'Booleans cannot be entered' });
    } else if (password.length < 8) {
      return res.status(400).json({ message: 'Your password must be at least 8 characters long' });
    } else if (re.test(email) === false) {
      return res.status(400).json({ message: 'Please enter a valid email' });
    } else {
      client.query('INSERT INTO users (email, username, password) VALUES ( $1, $2, $3) RETURNING *', [email, username, hashed], (err, resp) => {
        if (err) {
          return res.status(409).json({ error: err, pwd: hashed });
        } else {
          return res.json({ message: 'User successfully added' });
        }
      });
    }
  }

  /**
 * @static
 * @param {obj} req
 * @param {obj} res
 * @memberof Usercontroller
 */
signin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter missing fields' });
    } else {
      client.query(`SELECT * FROM users WHERE email ='${email}'`, (err, resp) => {
        if (err) {
          return res.status(400).json({ error: 'Wrong email or password, please try again' });
        } else if (resp.rowCount === 0) {
          return res.status(400).json({ message: 'This email address does not have an account' });
        } else {
          if (bcrypt.compareSync(password, resp.rows[0].password)) {
            return res.json({ message: `${resp.rows[0].email} is signed in` });
          } else {
            return res.status(400).json({ messsage: 'Incorrect password' });
          }
        }
      });
    }
  }
}

const userController = new Usercontroller();

export default userController;