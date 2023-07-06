const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Hospital API',
    description: 'Hospital API'
  },
  host: 'final-project-sho6.onrender.com',
  schemes: ['https'],
  tags: [
    { name: 'Doctors', description: 'APIs for doctors' },
    { name: 'Patients', description: 'APIs for patients' },
    { name: 'Nurses', description: 'APIs for nurses' },
    { name: 'Admins', description: 'APIs for administrators' },
  ],
  definitions: {
    Doctor: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        sex: { type: 'string' },
        birthdate: { type: 'string', format: 'date' },
        email: { type: 'string', format: 'email' },
        phone: { type: 'string' },
        specialty: { type: 'string' },
        isAvailable: { type: 'boolean' },
        npi: { type: 'integer', format: 'int64' },
      },
    },
    Patient: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        sex: { type: 'string' },
        birthdate: { type: 'string', format: 'date' },
        email: { type: 'string', format: 'email' },
        phone: { type: 'string' },
        dxcode: { type: 'string' },
        drNpi: { type: 'integer', format: 'int64' },
      },
    },
    Nurse: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        sex: { type: 'string' },
        birthdate: { type: 'string', format: 'date' },
        email: { type: 'string', format: 'email' },
        phone: { type: 'string' },
        shift: { type: 'string' }
      },
    },
    Administrator: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        sex: { type: 'string' },
        birthdate: { type: 'string', format: 'date' },
        email: { type: 'string', format: 'email' },
        phone: { type: 'string' },
        department: { type: 'string' },
        securityLevel: { type: 'integer', format: 'int64'}
      },
    },
  },
};

const outputFile = './swagger.json';
const endpointsFiles = ['./Routes/index.js'];

// generate swagger.json
//swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
 swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
   await import('./server.js');
 });