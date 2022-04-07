import mongoose from 'mongoose';
import { crudControllers } from '../utils/crud.js';

const Schema = mongoose.Schema;
const poshShipmentSchema = new Schema(({}), { strict: false });
const postShipments = mongoose.model(
  'postShipments',
  poshShipmentSchema,
  'post_shipments'
);

export default crudControllers(postShipments);
