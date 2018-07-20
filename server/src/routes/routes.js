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

router.get('/', (req, res) => {
  db.getAll();
  res.json({
    entry: db.getAll(),
    message: 'View all entries',
    error: false
  });
});

router.get('/:id', (req, res) => {
  res.json({
    entry: db.getOne(Number(req.params.id)),
    message: 'View this entry',
  });
});

router.put('/:id', (req, res) => {
  req.body.id = Number(req.params.id);
  res.json({
    entry: db.modifyOne(req.body),
    message: 'Entry is successfully edited',
    error: false
  });
});

export default router;