import express from 'express';

import { genericErrorHandle } from 'utils/httpHelpers/controller';

const router = express.Router();

router.get('/checkouts', async (req, res) => {
  try {
  } catch (error) {
    genericErrorHandle('');
  }
});

export default router;
