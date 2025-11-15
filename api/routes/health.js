const express = require('express');
const router = express.Router();
const packageInfo = require('../../package.json');

router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Task Manager API is alive! 🚀',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

router.get('/version', (req, res) => {
  const { name, version } = packageInfo;
  res.json({
    name,
    version,
    environment: process.env.NODE_ENV || 'development',
  });
});

module.exports = router;
