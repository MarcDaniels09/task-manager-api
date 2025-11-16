// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Task Manager API',
    version: '1.0.0',
    description: 'A professional Task Manager API with health checks, authentication, and CRUD endpoints',
  },
  // Relative URL will auto-detect host (local or Render)
  servers: [
    {
      url: '/',
      description: 'Current server (auto-detect)',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token in the format: Bearer <token>',
      },
    },
  },
  security: [], // default no security globally; add per-route
};

// Options for swagger docs
const options = {
  swaggerDefinition,
  apis: ['./api/routes/*.js', './server.js'], // Scan all route files
};

// Initialize swagger docs
const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
