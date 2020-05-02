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
import classController from 'pages/class/Class.controller';
import teacherController from 'pages/teacher/Teacher.controller';
import authorController from 'pages/authors/Authors.controller';
import decimalController from 'pages/deweySystem/decimal/Decimal.controller';
import summary1Controller from 'pages/deweySystem/summary1/Summary1.controller';

const app = express();

// TODO add whitelist for dynamic ip allocation... probably

app.use(express.static(path.join(process.cwd(), 'build')));

app.get('/', (req, res) => {
  const appLocation = path.join(process.cwd(), 'build', 'index.html');
  res.sendFile(appLocation);
});

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());

app.use('/student', studentController);
app.use('/home', homeController);
app.use('/booksout', booksoutController);
app.use('/book', bookController);
app.use('/class', classController);
app.use('/teacher', teacherController);
app.use('/author', authorController);
app.use('/dewey_decimal', decimalController);
app.use('/dewey_summary', summary1Controller);

if (process.env.NODE_ENV === 'production')
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
else
  app.listen(3001, () => {
    console.log(`http://localhost:3001`);
  });
