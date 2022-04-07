import mongoose from 'mongoose';

export const deliveryAttemptSchema = new mongoose.Schema({
  courierId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  date: {
    type: Date,
  },
  successfulDelivery: {
    type: Boolean,
    default: false,
  },
  notFoundAtTheAddress: {
    type: Boolean,
    default: false,
  },
  refuseToSign: {
    type: Boolean,
    default: false,
  },
  refuseToAccept: {
    type: Boolean,
    default: false,
  },
  incorrectAddress: {
    type: Boolean,
    default: false,
  },
  illiterate: {
    type: Boolean,
    default: false,
  },
  givenNotice: {
    type: Boolean,
    default: false,
  },
  deceased: {
    type: Boolean,
    default: false,
  },
  evicted: {
    type: Boolean,
    default: false,
  },
  noPersonAtThatAddress: {
    type: Boolean,
    default: false,
  },
  leftInWorkspace: {
    type: Boolean,
    default: false,
  },
  recipientDidNotPickedUp: {
    type: Boolean,
    default: false,
  },
  additionalInformation: {
    type: String,
    trim: true,
  },
});

export const deliveryAttempt = mongoose.model(
  'deliveryAttempt',
  deliveryAttemptSchema
);
