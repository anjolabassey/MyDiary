// solution for validating email was gotten from https://www.codeproject.com/Tips/492632/Email-Validation-in-JavaScript

import { db, client } from '../models/database';

const bcrypt = require('bcrypt');

const addUser = (req, res) => {
  const { email, username, password } = req.body;
  const hash = bcrypt.hash(password, 10);
  const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!email || !username || !password) {
    res.status(400).json({ message: 'Please enter missing fields' });
  } else if (username === 'true' || username === 'false') {
    res.status(400).json({ message: 'Booleans cannot be entered' });
  } else if (password === 'true' || password === 'false') {
    res.status(400).json({ message: 'Booleans cannot be entered' });
  } else if (password.length < 8) {
    res.status(400).json({ message: 'Your password must be at least 8 characters long' });
  } else if (re.test(email) === false) {
    res.status(400).json({ message: 'Please enter a valid email' });
  } else {
    client.query('INSERT INTO users (email, username, password) VALUES ( $1, $2, $3) RETURNING *', [email, username, password], (err, resp) => {
      if (err) {
        res.status(400).json({ error: 'User not added successfully' });
      } else {
        res.json({
          message: 'User successfully added',
          entry: resp.row
        });
      }
    });
  }
};

const getUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Please enter missing fields' });
  } else {
    client.query(`SELECT * FROM entries WHERE id=${email}`, (err, resp) => {
      if (err) {
        res.status(400).json({ error: 'User not added successfully' });
      } else {
        res.json({
          message: 'User successfully added',
          entry: resp.row
        });
      }
    });
  }
};

export default {
  addUser,
  getUser
};