import { Router } from 'express';
import { shipment } from '../models/shipment.model.js';

const router = Router();

router.get('', (req, res) => {
  shipment.countDocuments(function (err, count) {
    res.status(200).send({ count });
  });
});

export default router;
