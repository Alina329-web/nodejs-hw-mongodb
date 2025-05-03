import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

import { getEnvVar } from './utils/getEnvVar.js';
import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHendler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import { UPLOAD_DIR } from './constants/index.js';

import authRouter from './routers/auth.js';
import cookieParser from 'cookie-parser';
import contactsRouter from './routers/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(express.json());
  app.use(logger);

  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);
  app.use(notFoundHandler);

  app.use(errorHandler);
  // console.log(process.env.PORT);
  const port = Number(getEnvVar('PORT', 3000));

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.listen(port, () => console.log(`Server running on port ${port}`));
};
