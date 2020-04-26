import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import studentController from 'pages/student/Student.controller';
import homeController from 'pages/home/Home.controller';
import booksoutController from 'pages/booksOut/Booksout.controller';

const app = express();

// TODO add whitelist for dynamic ip allocation... probably

app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());

app.use('/student', studentController);
app.use('/home', homeController);
app.use('/booksout', booksoutController);

app.listen(3001, () => {
  console.log(`http://localhost:3001`);
});
