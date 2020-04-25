import express from 'express';
import stud from 'pages/student/Student.repo';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('/ was hit');
});

router.get('/home', (req, res) => {
  stud.getAll().then(result => res.send(result));
});

export default router;
