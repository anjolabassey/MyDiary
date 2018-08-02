import express from 'express';
import entryController from '../controllers/entries';
import userController from '../controllers/users';
import checkAuth from '../helpers/auth';

const router = express.Router();

router.post('/entries', checkAuth, entryController.addEntry);
router.get('/entries', checkAuth, entryController.getAllEntries);
router.get('/entries/:id', checkAuth, entryController.getOneEntry);
router.put('/entries/:id', checkAuth, entryController.modifyOneEntry);
router.delete('/entries/:id', checkAuth, entryController.deleteOneEntry);

router.post('/auth/signup', userController.signup);
router.post('/auth/signin', userController.signin);

export default router;