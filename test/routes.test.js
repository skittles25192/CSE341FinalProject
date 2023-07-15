const request = require('supertest');
const app = require('../server');
const mongodb = require('../Database/mongodbconnect');

jest.mock('express-openid-connect', () => ({
    auth: jest.fn(() => (req, res, next) => next()),
    requiresAuth: jest.fn(() => (req, res, next) => next()),
}));

beforeAll(async () => {
    // Wait for the database to connect before running the tests
    await new Promise((resolve) => {
        mongodb.initDb((err, db) => {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            resolve();
        });
    });
});

describe('Doctors Routes', () => {

    let testId

    it('should create a new doctor', async () => {
        const response = await request(app)
            .post('/doctors')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                sex: 'Male',
                birthdate: '01/01/1986',
                email: 'johndoe@example.com',
                phone: '123-456-7890',
                specialty: 'Cardiology',
                isAvailable: 'true',
                npi: '1234567890'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.acknowledged).toBe(true);
        testId = response.body.insertedId;
    });

    it('should update a doctor', async () => {
        const response = await request(app)
            .put('/doctors/' + testId)
            .send({
                firstName: 'John',
                lastName: 'Doe',
                sex: 'Male',
                birthdate: '01/01/1986',
                email: 'johndoe@example.com',
                phone: '123-456-7890',
                specialty: 'Cardiology',
                isAvailable: 'true',
                npi: '1234567890'
            });

        expect(response.statusCode).toBe(204);
    });

    it('should get all doctors', async () => {
        const response = await request(app).get('/doctors');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get available doctors', async () => {
        const response = await request(app).get('/doctors/check/isAvailable');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get a doctor by id', async () => {
        const response = await request(app).get('/doctors/' + testId);

        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testId);
    });

      it('should get doctors by patient id', async () => {
        const response = await request(app).get('/doctors/bypatient/64a701be1188db6c982d2b56'); // Curently just a get by id.

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
      });


    it('should delete a doctor', async () => {
        const response = await request(app).delete('/doctors/' + testId);

        expect(response.statusCode).toBe(204);
    });

});

describe('Patients Routes', () => {

    let testId
  
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
  
      expect(response.statusCode).toBe(201);
      expect(response.body.acknowledged).toBe(true);
      testId = response.body.insertedId;
    });
  
    it('should update a patient', async () => {
      const response = await request(app)
        .put('/patients/' + testId)
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
  
      expect(response.statusCode).toBe(204);
    });
  
    it('should get all patients', async () => {
      const response = await request(app).get('/patients');
  
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  
    it('should get a patient by id', async () => {
      const response = await request(app).get('/patients/' + testId);
  
      expect(response.statusCode).toBe(200);
      expect(response.body._id).toBe(testId);
    });
  
    it('should get patients by doctor NPI', async () => {
      const response = await request(app).get('/patients/byDoctor/1234567890');
  
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  
    it('should get patients by diagnosis code', async () => {
      const response = await request(app).get('/patients/byDiagnosis/R41.3');
  
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
  
    it('should delete a patient', async () => {
      const response = await request(app).delete('/patients/' + testId);
  
      expect(response.statusCode).toBe(204);
    });
  
  });

  describe('Nurses Routes', () => {

    let testId

    it('should create a new nurse', async () => {
        const response = await request(app)
            .post('/nurses')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                sex: 'Male',
                birthdate: '01/01/1986',
                email: 'johndoe@example.com',
                phone: '123-456-7890',
                shift: 'Day'
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.acknowledged).toBe(true);
        testId = response.body.insertedId;
    });

    it('should update a nurse', async () => {
        const response = await request(app)
            .put('/nurses/' + testId)
            .send({
                firstName: 'John',
                lastName: 'Doe',
                sex: 'Male',
                birthdate: '01/01/1986',
                email: 'johndoe@example.com',
                phone: '123-456-7890',
                shift: 'Day'
            });

        expect(response.statusCode).toBe(204);
    });

    it('should get all nurses', async () => {
        const response = await request(app).get('/nurses');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get a nurse by id', async () => {
        const response = await request(app).get('/nurses/' + testId);

        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testId);
    });

    //   it('should get nurses by patient id', async () => {
    //     const response = await request(app).get('/nurses/bypatient/');

    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.length).toBeGreaterThan(0);
    //   });


    it('should delete a nurse', async () => {
        const response = await request(app).delete('/nurses/' + testId);

        expect(response.statusCode).toBe(204);
    });


});

  describe('admins Routes', () => {

    let testId

    it('should create a new admin', async () => {
        const response = await request(app)
            .post('/admins')
            .send({
                firstName: 'John',
                lastName: 'Doe',
                sex: 'Male',
                birthdate: '01/01/1986',
                email: 'johndoe@example.com',
                phone: '123-456-7890',
                department: 'IT',
                securityLevel: 1
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.acknowledged).toBe(true);
        testId = response.body.insertedId;
    });

    it('should update a admin', async () => {
        const response = await request(app)
            .put('/admins/' + testId)
            .send({
                firstName: 'John',
                lastName: 'Doe',
                sex: 'Male',
                birthdate: '01/01/1986',
                email: 'johndoe@example.com',
                phone: '123-456-7890',
                department: 'IT',
                securityLevel: 1
            });

        expect(response.statusCode).toBe(204);
    });

    it('should get all admins', async () => {
        const response = await request(app).get('/admins');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get a admin by id', async () => {
        const response = await request(app).get('/admins/' + testId);

        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(testId);
    });


    it('should delete a admin', async () => {
        const response = await request(app).delete('/admins/' + testId);

        expect(response.statusCode).toBe(204);
    });

});