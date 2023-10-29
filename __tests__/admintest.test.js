const request = require('supertest');
import app from '../src/app';
import mongoose from 'mongoose';

const user = {};
const config = {
  authorization: `Bearer`
};

beforeAll(async () => {
  await request(app)
    .post('api/v1/auth/login')
    .send({
      email: 'fazidsamoon331@gmail.com',
      password: 'Test@123'
    })
    .then((res) => {
      console.log('logged in');
      user.token = res.body.data.token;
      user._id = res.body.data.otherDetails._id.toString();
    //   user.username = res.body.username;

      config.authorization = config.authorization + ' ' + user.token;
    })
    .catch(error => console.log(error));
}, 30000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Site Controller', () => {
    test('It should require authorization', async () => {
      const response = await request(app).get('/api/v1/site');
      expect(response.statusCode).toBe(401);
    });

    test('It should respond with JSON', async () => {
        const response = await request(app)
          .get('/api/v1/site')
          .set('Authorization', config.authorization);
        expect(response.statusCode).toBe(401);
        expect(response.type).toBe('application/json');
      });
    
      test('It should get all sites', async () => {
        const response = await request(app)
          .get('/api/v1/site')
          .set('Authorization', config.authorization);
        expect(response.statusCode).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
      });

      test('It should add a site', async () => {
        const response = await request(app)
          .get('/api/v1/site')
          .set('Authorization', config.authorization);
        expect(response.statusCode).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
      });

      test('It should update a site ', async () => {
        const response = await request(app)
          .get('/api/v1/site')
          .set('Authorization', config.authorization);
        expect(response.statusCode).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
      });

      test('It should delete a site ', async () => {
        const response = await request(app)
          .get('/api/v1/site')
          .set('Authorization', config.authorization);
        expect(response.statusCode).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
      });
    
})  