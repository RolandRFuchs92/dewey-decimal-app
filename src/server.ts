import path from 'path';
import https from 'https';
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
app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

app.get('*', function(req, res) {
  res.sendFile(path.resolve(pathToIndexHtml, 'index.html'));
});
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(pathToIndexHtml, 'index.html'));
// });

if (process.env.NODE_ENV === 'production')
  // https
  //   .createServer(
  //     {
  //       key: fs.readFileSync(path.resolve('./cert/key.pem')),
  //       cert: fs.readFileSync(path.resolve('./cert/cert.pem'))
  //     },
  //     app
  //   )
  app.listen(production.port, () => {
    console.log(`listening on ${production.uri}:${production.port}`);
  });
else
  app.listen(development.port, () => {
    console.log(`Listening on ${development.uri}:${development.port}`);
  });
