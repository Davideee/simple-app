import { Router } from 'express';
import {getCounterController, iterateCounterController} from "../controllers/counterController";

const router = Router();

router.get('', getCounterController);
router.post('', iterateCounterController);

export default router;
