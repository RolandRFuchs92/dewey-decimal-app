import express, { Request, Response } from 'express';

import studentController from 'pages/student/Student.controller';
import homeController from 'pages/home/Home.controller';
import booksoutController from 'pages/booksOut/Booksout.controller';
import bookController from 'pages/books/Book.controller';
import classController from 'pages/class/Class.controller';
import teacherController from 'pages/teacher/Teacher.controller';
import authorController from 'pages/authors/Authors.controller';
import decimalController from 'pages/deweySystem/decimal/Decimal.controller';
import summary1Controller from 'pages/deweySystem/summary1/Summary1.controller';
import summary2Controller from 'pages/deweySystem/summary2/Summary2.controller';
import summary3Controller from 'pages/deweySystem/summary3/Summary3.controller';

const app = express.Router();

app.use('/student', studentController);
app.use('/home', homeController);
app.use('/booksout', booksoutController);
app.use('/book', bookController);
app.use('/class', classController);
app.use('/teacher', teacherController);
app.use('/author', authorController);
app.use('/dewey_decimal', decimalController);
app.use('/dewey_summary', summary1Controller);
app.use('/dewey_summary_2', summary2Controller);
app.use('/dewey_summary_3', summary3Controller);

export default app;
