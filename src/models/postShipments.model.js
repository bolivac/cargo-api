import mongoose from 'mongoose';

const postShipmentsSchema = new mongoose.Schema({});

export const postShipments = mongoose.model(
  'postShipments',
  postShipmentsSchema
);
