import express from 'express';
import db from '../db';

const router = express.Router();

router.post('/', (req, res) => {
  db.addOne(req.body);
  res.json({
    message: 'Entry added succesfully',
    error: false
  });
});

export default router;