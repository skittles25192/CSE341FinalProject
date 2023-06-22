const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Hospital API',
    description: 'Hospital API'
  },
  host: 'final-project-sho6.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./Routes/index.js'];

// generate swagger.json
//swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
 swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
   await import('./server.js');
 });