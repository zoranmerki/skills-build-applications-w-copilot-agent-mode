import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/api.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});
app.use('/api', apiRouter);

void connectDatabase().catch((error: unknown) => {
  console.error('Error connecting to octofit_db:', error);
});

app.listen(port, () => {
  console.log(`Octofit API listening at ${apiBaseUrl}`);
});