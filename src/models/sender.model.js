import mongoose from 'mongoose';

const senderSchema = new mongoose.Schema({
  id: mongoose.ObjectId,
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  embs: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

export const sender = mongoose.model('sender', senderSchema);
