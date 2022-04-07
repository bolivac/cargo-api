import { Router } from 'express';
import controllers from '../controllers/postShipment.controller.js';

const router = Router();

router.route('/:id').get(controllers.getHistory);

export default router;
