import Product from "../models/product.model";

export const addProduct = async (product) => {
  const response = await Product.create(product);
  return response.populate("seller");
};

export const findByProducNameAndSeller = async (productName, sellerId) => {
  const product = await Product.findOne({
    name: productName,
    seller: sellerId,
  });
  return product;
};

export const deleteExistingProductByProductIDAndSeller = async (productId) => {
  const response = await Product.findByIdAndUpdate(
    productId,
    { is_active: false },
    { new: true }
  );
  return response;
};

export const findProductById = async (productId) => {
  return await Product.findById(productId).populate("seller");
};

export const getAllProducts = async (params) => {
  const { sort, sellerId, productName, is_active, page, limit } = params;
  let queryparams = {
    is_active: true,
  };
  if (sellerId) queryparams.seller = sellerId;
  if (productName) queryparams.name = { $regex: productName, $options: "i" };
  if (is_active) queryparams.is_active = is_active;
  let response = Product.find(queryparams).populate("seller");

  if (sort) {
    let sortList = sort.split(",").join(" ");
    response = response?.sort(sortList);
  } else {
    if (response.length > 0) response = response?.sort("createdAt");
  }

  const pages = Number(page) || 1;
  const limits = Number(limit) || 10;
  const skips = (pages - 1) * limits;
  response = response.skip(skips).limit(limits);
  const totalPages = Math.ceil(
    (await Product.countDocuments(queryparams)) / limits
  );

  return {
    data: await response,
    total: await Product.countDocuments(queryparams),
    totalPages: totalPages,
    page: pages,
    limit: limits,
  };
};

export const updateExistingProductByProductID = async (productId, body) => {
  const response = await Product.findByIdAndUpdate(
    productId,
    { ...body },
    { new: true }
  );
  return response;
};

export const productCountBySeller = async (sellerId) => {
  const response = await Product.countDocuments({ seller: sellerId });
  return response;
};

export const updateProductQuantity = async (productId, quantity) => {
  const response = await Product.findByIdAndUpdate(
    productId,
    {
      $inc: { inStock: -quantity },
    },
    { new: true }
  );
  return response;
};
