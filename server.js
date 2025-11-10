// server.js — FULLY WORKING VERSION (copy-paste entire file)

const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Body parser
app.use(express.json());

// Swagger setup
const { swaggerUi, swaggerSpec } = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Import routes
const taskRoutes = require('./routes/taskRoutes');
const healthRoutes = require('./routes/health').default;

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

// Your task routes
app.use('/tasks', taskRoutes);

// THIS IS THE ONLY LINE THAT WORKS WITH ts-node + Express 4.18+
// REGEX CATCH-ALL — NO MORE PathError EVER
app.all(/.*/, (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: 'Available: /, /health, /version, /tasks',
    your_ip: req.ip,
    method: req.method,
    url: req.originalUrl
  });
});

// Database & Server
const sequelize = require('./config/db');
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Open: http://localhost:${PORT}`);
      console.log(`SWAGGER UI: http://localhost:${PORT}/api-docs`);
      console.log(`Health: http://localhost:${PORT}/health`);
    });
  })
  .catch(err => {
    console.error('DB connection failed:', err);
  });