import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import { api } from './paths.js';
export const app = express();

const DIRNAME = dirname(fileURLToPath(import.meta.url));

app.use(express.json());

api(app);

if (!process.env['VITE']) {
  const frontendFiles = DIRNAME + '/dist';

  app.use(express.static(frontendFiles));

  const PORT = process.env['PORT'] || 3000;

  app.listen(PORT, '127.0.0.1', () => console.log(`Access your website on: localhost:${PORT}`));
}
