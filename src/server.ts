import fs from 'fs';
import path from 'path';
import https from 'https';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import studentController from 'pages/student/Student.controller';
import homeController from 'pages/home/Home.controller';
import booksoutController from 'pages/booksOut/Booksout.controller';
import bookController from 'pages/books/Book.controller';

const app = express();

// TODO add whitelist for dynamic ip allocation... probably

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());

app.use('/student', studentController);
app.use('/home', homeController);
app.use('/booksout', booksoutController);
app.use('/book', bookController);

https
  .createServer(
    {
      key: fs.readFileSync(path.resolve('./cert/key.pem')),
      cert: fs.readFileSync(path.resolve('./cert/cert.pem'))
    },
    app
  )
  .listen(3001, () => {
    console.log(`https://localhost:3001`);
  });
