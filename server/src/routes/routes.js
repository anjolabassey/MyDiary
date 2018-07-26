import express from 'express';
import entries from '../controllers/entries';

const router = express.Router();

router.post('/', entries.addOne);
router.get('/', entries.getAll);
router.get('/:id', entries.getOne);
router.put('/:id', entries.modifyOne);
router.delete('/:id', entries.deleteOne);

export default router;