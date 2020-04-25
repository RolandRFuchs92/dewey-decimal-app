import express, { Request, Response } from 'express';
import studentRoute from 'pages/student/Student.service';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.use('/home', studentRoute);

app.listen(3001, () => {
  console.log(`http://localhost:3001`);
});
