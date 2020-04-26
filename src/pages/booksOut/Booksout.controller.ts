import express from 'express';

const router = express.Router();

router.get('/checkouts', async (req, res) => {
  try {
  } catch (error) {
    res.statusCode = 500;
  }
});

export default router;
