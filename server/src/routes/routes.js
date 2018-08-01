import express from 'express';
import entryController from '../controllers/entries';
import userController from '../controllers/users';

const router = express.Router();

router.post('/entries', entryController.addOne);
router.get('/entries', entryController.getAll);
router.get('/entries/:id', entryController.getOne);
router.put('/entries/:id', entryController.modifyOne);
router.delete('/entries/:id', entryController.deleteOne);

router.post('/auth/signup', userController.signup);
router.post('/auth/signin', userController.signin);

export default router;