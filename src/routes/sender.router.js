import { Router } from 'express';
import controllers from '../controllers/sender.controller.js';

const router = Router();

router.route('/').get(controllers.getMany).post(controllers.createOne);

router
  .route('/:id')
  .put(controllers.updateOne)
  .get(controllers.getOne)
  .delete(controllers.removeOne);

  export default router;
