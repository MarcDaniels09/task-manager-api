// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Dynamically detect server base URL
const serverUrl = process.env.RENDER_EXTERNAL_URL || 'http://localhost:5000';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Task Manager API',
    version: '1.0.0',
    description: 'A professional Task Manager API with health checks and CRUD endpoints',
  },
  servers: [
    {
      url: serverUrl, 
      description: process.env.RENDER_EXTERNAL_URL ? 'Render deployment' : 'Local server',
    },
  ],
};

// Options for swagger docs
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './server.js'], 
};

// Initialize swagger docs
const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
