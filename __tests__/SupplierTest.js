const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app'); 
const Product = require('../models/product'); 

beforeAll(async () => {
  // Connect to a test database, assuming you have a test database set up
  await mongoose.connect('mongodb://localhost:27017/testDBCSSE', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect from the test database and perform cleanup
  await mongoose.connection.close();
});

describe('Product Routes and Controller', () => {
  let productId; 

  test('Should create a new product', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({
        name: 'Test Product',
        description: 'This is a test product',
        price: 50,
        inStock: 10,
        seller: 'seller_id',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product added successfully');
    productId = response.body.data._id; 
  });

  test('Should get a specific product by ID', async () => {
    const response = await request(app).get(`/api/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });

  test('Should update a product', async () => {
    const response = await request(app)
      .patch(`/api/products/${productId}`)
      .send({
        price: 60,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product updated successfully');
  });

  test('Should delete a product', async () => {
    const response = await request(app).delete(`/api/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product deleted successfully');
  });

});
