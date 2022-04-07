import { Router } from 'express';
import controllers from '../controllers/shipment.controller.js';

const router = Router();

router.route('/').get(controllers.getManyShipments).post(controllers.createOne);

router
  .route('/:id')
  .put(controllers.updateOne)
  .get(controllers.getOne)
  .delete(controllers.removeOne);

  export default router;
