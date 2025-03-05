import { Router } from 'express';
import {registerUserController, loginUserController, findUserController} from '../controllers/userController';

const router = Router();

router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.get('/', findUserController);

export default router;
