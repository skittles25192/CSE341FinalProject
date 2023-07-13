const request = require('supertest');
const app = require('../app');

describe('Patients Routes', () => {
  it('should create a new patient', async () => {
    const response = await request(app)
      .post('/patients')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        sex: 'M',
        birthdate: '10/10/1997',
        email: 'john.doe@example.com',
        phone: '555-555-5555',
        dxcode: 'R41.3',
        npi: '1234567890'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.firstName).toBe('John');

  });

  it('should update a patient', async () => {
    const response = await request(app)
      .put('/patients/1') // Add Proper ID here
      .send({
        firstName: 'John',
        lastName: 'Doe',
        sex: 'M',
        birthdate: '10/10/1997',
        email: 'john.doe@example.com',
        phone: '555-555-5555',
        dxcode: 'R41.3',
        npi: '1234567890'
      });

    expect(res.statusCode).toBe(204);

  });

  it('should get all patients', async () => {
    const response = await request(app).get('/patients');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);

  });

  it('should get a patient by id', async () => {
    const response = await request(app).get('/patients/1'); // Add Proper ID here

    expect(res.statusCode).toBe(200);
    expect(res.body.firstName).toBe('John');

  });

  it('should get patients by doctor NPI', async () => {
    const response = await request(app).get('/patients/byDoctor/1234567890');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);

  });

  it('should get patients by diagnosis code', async () => {
    const response = await request(app).get('/patients/byDiagnosis/R41.3');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);

  });

  it('should delete a patient', async () => {
    const response = await request(app).delete('/patients/1'); // Add Proper ID here

    expect(res.statusCode).toBe(204);

  });
});