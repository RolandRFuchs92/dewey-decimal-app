import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import studentController from 'pages/student/Student.controller';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.use(bodyParser.json());
app.use('/student', studentController);

app.listen(3001, () => {
  console.log(`http://localhost:3001`);
});
