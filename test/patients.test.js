const request = require('supertest');
const app = require('../server');
const mongodb = require('../Database/mongodbconnect');

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

        expect(response.statusCode).toBe(201);
        expect(response.body.firstName).toBe('John');

    });

    //   it('should update a patient', async () => {
    //     const response = await request(app)
    //       .put('/patients/1') // Add Proper ID here
    //       .send({
    //         firstName: 'John',
    //         lastName: 'Doe',
    //         sex: 'M',
    //         birthdate: '10/10/1997',
    //         email: 'john.doe@example.com',
    //         phone: '555-555-5555',
    //         dxcode: 'R41.3',
    //         npi: '1234567890'
    //       });

    //     expect(response.statusCode).toBe(204);

    //   });

    it('should get all patients', async () => {
        const response = await request(app).get('/patients');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);

    });

    //   it('should get a patient by id', async () => {
    //     const response = await request(app).get('/patients/1'); // Add Proper ID here

    //     expect(response.statusCode).toBe(200);
    //     expect(response.body.firstName).toBe('John');

    //   });

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

    //   it('should delete a patient', async () => {
    //     const response = await request(app).delete('/patients/1'); // Add Proper ID here

    //     expect(response.statusCode).toBe(204);

    //   });
});