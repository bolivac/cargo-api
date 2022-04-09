import { dbConfig } from './db.config.js';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

export const connect = async () => {
  let dbUri = dbConfig.url;
  const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
  };

  if (process.env.MONGODB_URI) {
    dbUri = process.env.MONGODB_URI;
  }

  try {
    await db.mongoose.connect(dbUri, options);
    console.log('Successfully connect to MongoDB.');
  } catch (err) {
    console.error('Connection error', err);
    process.exit();
  }
};
