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
const endpointadmin = ['./Routes/admins.js'];
const endpointspatient = ['./Routes/patients.js'];


// generate swagger.json
//swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
 swaggerAutogen(outputFile, endpointadmin, endpointspatient, doc).then(async () => {
   await import('./server.js');
 });