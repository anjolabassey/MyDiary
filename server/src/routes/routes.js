import express from 'express';
import entries from '../controllers/entries';

const router = express.Router();

router.post('/entries', entries.addOne);
router.get('/entries', entries.getAll);
router.get('/entries/:id', entries.getOne);
router.put('/entries/:id', entries.modifyOne);
router.delete('/entries/:id', entries.deleteOne);

export default router;