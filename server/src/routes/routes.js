import express from 'express';
import entryController from '../controllers/entries';
import userController from '../controllers/users';
import checkAuth from '../helpers/auth';

const router = express.Router();

router.post('/entries', checkAuth, entryController.addEntry);
router.get('/entries', checkAuth, entryController.getAllEntries);
router.get('/entries/:id', checkAuth, entryController.getOne);
router.put('/entries/:id', checkAuth, entryController.modifyOne);
router.delete('/entries/:id', checkAuth, entryController.deleteOne);

router.post('/auth/signup', userController.signup);
router.post('/auth/signin', userController.signin);

export default router;