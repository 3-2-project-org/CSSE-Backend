const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app')
const Order = require('../src/models/order'); 

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect('mongodb://localhost:27017/testDBCSSE', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect from the test database and perform cleanup
  await mongoose.connection.close();
});

describe('Order Routes and Controller', () => {
  let orderId; 

  test('Should create a new order', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        products: [{ productID: 'product_id', quantity: 2 }],
        sellerID: 'seller_id',
        buyerID: 'buyer_id',
        amount: 100,
        status: 'Pending',
        deliveryAddress: '123 Main St',
        requiredDate: '2023-10-20',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order created successfully');
    orderId = response.body.data._id; 
  });

  test('Should get a specific order by ID', async () => {
    const response = await request(app).get(`/api/orders/${orderId}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });

  test('Should update an order', async () => {
    const response = await request(app)
      .patch(`/api/orders/${orderId}`)
      .send({
        status: 'Delivered',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order updated successfully');
  });

  test('Should delete an order', async () => {
    const response = await request(app).delete(`/api/orders/${orderId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Order deleted successfully');
  });
});
