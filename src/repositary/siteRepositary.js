import Site from "../models/site.model";

export const addSite = async (site) => {
  const response = await Site.create(site);
  return response.populate("Manager");
};

export const findBySiteAddressAndManager = async (SiteAddress, ManagerId) => {
  const site = await Site.findOne({
    address: SiteAddress,
    Manager: ManagerId,
  });
  return site;
};

export const deleteExistingSiteByID = async (siteId) => {
  const response = await Site.findByIdAndUpdate(
    siteId,
    { is_active: false },
    { new: true }
  );
  return response;
};

export const findSiteById = async (siteId) => {
  return await Site.findById(siteId).populate("Manager");
};

export const getAllSites = async (params) => {
  const { sort, managerId, SiteAddress, is_active, page, limit } = params;
  let queryparams = {
    is_active: true,
  };
  if (managerId) queryparams.Manager = managerId;
  if (SiteAddress) queryparams.Address = { $regex: SiteAddress, $options: "i" };
  if (is_active) queryparams.is_active = is_active;
  let response = Site.find(queryparams).populate("Manager");

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
  return {
    data: await response,
    total: await Site.countDocuments(queryparams),
    page: pages,
    limit: limits,
  };
};

export const updateExistingSiteByID = async (siteID, body) => {
  const response = await Site.findByIdAndUpdate(
    siteID,
    { ...body },
    { new: true }
  );
  return response;
};
