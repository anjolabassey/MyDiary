import express from 'express';
import Entrycontroller from '../controllers/entries';
import users from '../controllers/users';

const router = express.Router();

router.post('/entries', Entrycontroller.addOne);
router.get('/entries', Entrycontroller.getAll);
router.get('/entries/:id', Entrycontroller.getOne);
router.put('/entries/:id', Entrycontroller.modifyOne);
router.delete('/entries/:id', Entrycontroller.deleteOne);

router.post('/users', users.addUser);
router.post('/users', users.getUser);

export default router;