import cors from 'cors';
import express from 'express';
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { connect } from './src/utils/db.js';
import { baseConfig } from './src/config/index.js';
import courierRouter from './src/routes/courier.router.js';
import senderRouter from './src/routes/sender.router.js';
import shipmentRouter from './src/routes/shipment.router.js';
import countRouter from './src/routes/count.router.js';
import postShipmentRouter from './src/routes/postShipment.router.js';
import recipientRouter from './src/routes/recipient.router.js';
import userRouter from './src/routes/user.router.js';
import { passportInit } from './src/utils/passport.js';

const app = express();
// start database
connect();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const distDir = path.resolve();
app.use(express.static(distDir));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passportInit(passport);

// routes
app.use('/api/sender', senderRouter);
app.use('/api/courier', courierRouter);
app.use('/api/shipment', shipmentRouter);
app.use('/api/recipient', recipientRouter);
app.use('/api/auth', userRouter);
app.use('/api/count', countRouter);
app.use('/api/shipmenthistory', postShipmentRouter);

export const start = async () => {
  try {
    await connect();
    app.listen(baseConfig.port, () => {
      console.log(`REST API on http://localhost:${baseConfig.port}/`);
    });
  } catch (e) {
    console.error(e);
  }
};
