import express from 'express';
import entryController from '../controllers/entries';
import userController from '../controllers/users';
import checkAuth from '../helpers/auth';
import entryValidation from '../helpers/entryValidation';
import userValidation from '../helpers/userValidation';

const router = express.Router();

router.post('/entries', checkAuth, entryValidation, entryController.addEntry);
router.get('/entries', checkAuth, entryController.getAllEntries);
router.get('/entries/:id', checkAuth, entryController.getOneEntry);
router.put('/entries/:id', checkAuth, entryValidation, entryController.modifyEntry);
router.delete('/entries/:id', checkAuth, entryController.deleteEntry);

router.post('/auth/signup', userValidation.signUp, userController.signup);
router.post('/auth/signin', userValidation.signIn, userController.signin);

export default router;