import { dbConfig } from './db.config.js';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

export const connect = async () => {
  let dbUri = dbConfig.url;

  if (process.env.MONGODB_URI) {
    dbUri = process.env.MONGODB_URI;
  }

  console.log(dbUri);
  try {
    await db.mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connect to MongoDB.');
  } catch (err) {
    console.error('Connection error', err);
    process.exit();
  }
};
