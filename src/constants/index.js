export const sortList = ['asc', 'desc'];
import path from 'node:path';

// src/constants/index.js

/* Інший код файлу */

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
  APP_DOMAIN: 'APP_DOMAIN',
  JWT_SECRET: 'JWT_SECRET',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
