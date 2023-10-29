const mongoose = require('mongoose');
const Site = require('../src/models/site.model');

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect('mongodb://localhost:27017/testDBCSSE', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  // Disconnect from the test database and perform cleanup
  await mongoose.connection.close();
});

describe('Site Model', () => {
  test('Should create a new site', async () => {
    const siteData = {
      Address: '123 Main St',
      Manager: 'user_id',
      Allocated_budget: 1000,
    };
    const newSite = await Site.create(siteData);
    expect(newSite).toBeDefined();
  });

  test('Should fetch a site by ID', async () => {
    const newSite = await Site.create({
      Address: '456 Elm St',
      Manager: 'user_id',
      Allocated_budget: 1500,
    });
    const retrievedSite = await Site.findById(newSite._id);
    expect(retrievedSite.Address).toBe('456 Elm St');
  });

  test('Should update a site by ID', async () => {
    const newSite = await Site.create({
      Address: '789 Oak St',
      Manager: 'user_id',
      Allocated_budget: 2000,
    });

    const updatedData = {
      Address: 'Updated Address',
      Allocated_budget: 2500,
    };

    const updatedSite = await Site.findByIdAndUpdate(newSite._id, updatedData, {
      new: true,
    });

    expect(updatedSite.Address).toBe('Updated Address');
    expect(updatedSite.Allocated_budget).toBe(2500);
  });

  test('Should delete a site by ID', async () => {
    const newSite = await Site.create({
      Address: '999 Pine St',
      Manager: 'user_id',
      Allocated_budget: 3000,
    });

    const deletedSite = await Site.findByIdAndRemove(newSite._id);

    expect(deletedSite).not.toBeNull();

    // Check if the site is deleted
    const siteAfterDeletion = await Site.findById(newSite._id);
    expect(siteAfterDeletion).toBeNull();
  });



});
