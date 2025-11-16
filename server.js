const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./api/config/db');          // ← correct path
const { swaggerUi, swaggerSpec } = require('./swagger');
const authRoutes = require('./api/routes/authRoutes');
const transactionRoutes = require('./api/routes/transactionRoutes');
const taskRoutes = require('./api/routes/taskRoutes'); // ← correct path
const healthRoutes = require('./api/routes/health');   // ← correct path

dotenv.config();
const app = express();

// Body parser
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health + Version + Root
app.use('/', healthRoutes);

// Welcome page
app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API is running!',
    status: 'OK',
    endpoints: {
      health: '/health',
      version: '/version',
      tasks: '/tasks'
    }
  });
});

// Task routes
app.use('/tasks', taskRoutes);

// Auth and Transaction routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Catch-all for undefined routes
app.all(/.*/, (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: 'Available: /, /health, /version, /tasks',
    your_ip: req.ip,
    method: req.method,
    url: req.originalUrl
  });
});

// Start the server after syncing DB
const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at: http://localhost:${PORT}`);
      console.log(`📘 Swagger UI: http://localhost:${PORT}/api-docs`);
      console.log(`💓 Health Check: http://localhost:${PORT}/health`);
    });
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err);
  });
