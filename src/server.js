import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';
import { getcontacts, getcontactById } from './services/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.get('/contacts', async (reg, res) => {
    const data = await getcontacts();
    res.json({
      status: 200,
      messege: 'Successfully found contacts!',
      data,
    });
  });

  app.get('/contacts/:id', async (reg, res) => {
    const { id } = reg.params;
    const data = await getcontactById(id);
    if (!data) {
      return res.status(404).json({
        status: 404,
        messege: 'Contact not found',
      });
    }
    res.json({
      status: 200,
      messege: `Successfully find contacts with id =${id}`,
      data,
    });
  });

  app.use((reg, res) => {
    res.status(404).json({
      messege: `${reg.url} not found`,
    });
  });

  app.use((error, reg, res, next) => {
    res.status(500).json({
      messege: error.messege,
    });
  });
  // console.log(process.env.PORT);
  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => console.log(`Server running on port ${port}`));
};
