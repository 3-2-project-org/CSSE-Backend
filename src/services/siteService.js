import {
    addSite,
    deleteExistingSiteByID,
    findBySiteAddressAndManager,
    findSiteById,
    updateExistingSiteByID,
    getAllSites,
  } from "../repositary/siteRepositary";
  
  export const addNewSiteService = async (site, managerID) => {
    const existingSite = await findBySiteAddressAndManager(
      site?.address,
      managerID
    );
    if (existingSite)
      return { status: 400, message: "Site already exists" };
    const response = await addSite({ ...site, manager: managerID });
    return response;
  };
  
  export const deleteExistingProductService = async (productId, sellerId) => {
    const existingProduct = await findProductById(productId);
    if (!existingProduct) return { status: 400, message: "Product not found" };
    if (existingProduct?.seller?._id.toString() !== sellerId)
      return { status: 401, message: "Not authorized" };
    const response = await deleteExistingProductByProductIDAndSeller(productId);
    return response;
  };
  
  export const getAllProductsService = async (params) => {
    const products = await getAllProducts(params);
    return products;
  };
  
  export const getSingleProductService = async (productId) => {
    return await findProductById(productId);
  };
  
  export const updateExistingProductService = async (
    productId,
    sellerId,
    body
  ) => {
    const existingProduct = await findProductById(productId);
    if (!existingProduct) return { status: 400, message: "Product not found" };
    if (existingProduct?.seller?._id.toString() !== sellerId)
      return { status: 401, message: "Not authorized" };
    const response = await updateExistingProductByProductID(productId, body);
    return response;
  };
  
  export const getTotalProductCountBySellerService = async (sellerId) => {
    const response = await getAllProducts({ sellerId });
    return response?.total;
  };
  