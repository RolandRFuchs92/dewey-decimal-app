import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import studentController from 'pages/student/Student.controller';
import homeController from 'pages/home/Home.controller';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.use(bodyParser.json());
app.use('/student', studentController);
app.use('/home', homeController);

app.listen(3001, () => {
  console.log(`http://localhost:3001`);
});
