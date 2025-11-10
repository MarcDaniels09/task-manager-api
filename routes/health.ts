import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Task Manager API is alive! 🚀',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

router.get('/version', (req, res) => {
  const { name, version } = require('../package.json');
  res.json({
    name,
    version,
    environment: process.env.NODE_ENV || 'development',
  });
});

export default router;