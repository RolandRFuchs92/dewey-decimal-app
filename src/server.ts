import path from 'path';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { production, development } from 'endpoints.json';
import InitializeDatabase from 'db/initializeDb';
import log from 'utils/logger';

import routes from './routes';

const app = express();
// TODO add whitelist for dynamic ip allocation... probably

(async () => {
  await InitializeDatabase();
})();

var dirname = __dirname;
const pathToIndexHtml = path.resolve(dirname, '..', 'build');
log.info(`Static files location will be looked for at ${pathToIndexHtml}`);

app.get('*', express.static(pathToIndexHtml));

app.options('*', cors());
app.get('*', async (req, res, next) => {
  const clientIp =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  log.info(`Request received from ${clientIp}`);
  next();
});
app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

app.get('*', function(req, res, next) {
  res.sendFile(path.resolve(pathToIndexHtml, 'index.html'));
});

if (process.env.NODE_ENV === 'production')
  app.listen(production.port, () => {
    console.log(`listening on ${production.uri}:${production.port}`);
  });
else
  app.listen(development.port, () => {
    console.log(`Listening on ${development.uri}:${development.port}`);
  });
