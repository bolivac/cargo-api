import mongoose from 'mongoose';

export const recipientSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  phone: {
    type: Number,
    trim: true,
  },
  additionalInformation: {
    type: String,
    trim: true,
  },
});

export const recipient = mongoose.model('recipient', recipientSchema);
