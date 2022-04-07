import { dbConfig } from './db.config.js';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

export const connect = async () => {
  let dbUri = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
  if (process.env.MONGODB_URI) {
    dbUri = process.env.MONGODB_URI;
  }

  try {
    await db.mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'biznisposta'
    });
    console.log('Successfully connect to MongoDB.');
  } catch (err) {
    console.error('Connection error', err);
    process.exit();
  }
};
