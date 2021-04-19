import express from 'express';

const router = express.Router();

router.get('/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
  });
  
export default router;