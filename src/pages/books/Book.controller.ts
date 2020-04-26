import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('Get Root');
});

router.post('/', async (req, res) => {
  res.send('Post root');
});

router.put('/', async (req, res) => {
  res.send('Put root');
});

router.delete('/', async (req, res) => {
  res.send('DELETE root');
});

export default router;
