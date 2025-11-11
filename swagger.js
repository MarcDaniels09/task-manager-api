// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
      url: '/', 
      description: 'Current server (auto-detect)',
    },
  ],
};

// Options for swagger docs
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './server.js'], // no need for .ts anymore since all are JS
};

// Initialize swagger docs
const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
