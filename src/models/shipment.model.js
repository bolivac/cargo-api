import mongoose from 'mongoose';
import { deliveryAttemptSchema } from '../models/deliveryAttempt.model.js';
import { recipientSchema } from '../models/recipient.model.js';
// import patchHistory from 'mongoose-patch-history';

export const shipmentSchema = new mongoose.Schema({
  id: mongoose.ObjectId,
  uid: {
    type: Number,
    unique: true,
  },
  subjectOfShipment: {
    type: String,
    trim: true,
  },
  deliveryType: {
    type: String,
    trim: true,
  },
  recommendedShipment: {
    type: Boolean,
    default: false,
  },
  personalShipment: {
    type: Boolean,
    default: false,
  },
  withReturnShipment: {
    type: Boolean,
    default: false,
  },
  shipmentDate: {
    type: Date,
  },
  shipmentPostage: {
    type: Number,
  },
  shipmentWeight: {
    type: Number,
  },
  senderId: mongoose.ObjectId,
  senderFullName: {
    type: String,
  },
  recipient: recipientSchema,
  deliveryAttempts: [deliveryAttemptSchema],
});

// shipmentSchema.plugin(patchHistory, {
//   mongoose,
//   name: 'postShipments',
//   trackOriginalValue: true,
// });

export const shipment = mongoose.model('shipment', shipmentSchema);
