import {
  addNewProductService,
  deleteExistingProductService,
  getAllProductsService,
  getSingleProductService,
  getTotalProductCountBySellerService,
  updateExistingProductService,
} from "../services/productService";
import { makeResponse } from "../utils/response";

export const addNewProduct = async (req, res) => {
  const id = req?.user?._id;
  const response = await addNewProductService(req.body, id);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Product added successfully",
  });
};

export const deleteExistingProduct = async (req, res) => {
  const id = req?.user?._id;
  const response = await deleteExistingProductService(req.params.id, id);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Product deleted successfully",
  });
};

export const getAllProducts = async (req, res) => {
  const params = req.query;
  const products = await getAllProductsService(params);
  if (!products)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  makeResponse({
    res,
    status: 200,
    data: products,
    message: "Product fetched successfully",
  });
};

export const getSingleProduct = async (req, res) => {
  const response = await getSingleProductService(req.params.id);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Product fetched successfully",
  });
};

export const updateExistingProduct = async (req, res) => {
  const id = req?.user?._id;
  const productId = req.params.id;
  const body = req.body;

  const response = await updateExistingProductService(productId, id, body);
  if (!response)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  if (response.status) return makeResponse({ res, ...response });
  makeResponse({
    res,
    status: 200,
    data: response,
    message: "Product updated successfully",
  });
};

export const getTotalProductCountBySeller = async (req, res) => {
  const id = req?.user?._id;
  const products = await getTotalProductCountBySellerService(id);
  if (!products)
    return makeResponse({ res, status: 400, message: "Something went wrong" });
  makeResponse({
    res,
    status: 200,
    data: products,
    message: "Product fetched successfully",
  });
};
