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
  
  export const deleteExistingSiteService = async (siteId, managerID) => {
    const existingSite = await findSiteById(siteId);
    if (!existingSite) return { status: 400, message: "Site not found" };
    const response = await deleteExistingSiteByID(siteId);
    return response;
  };
  
  export const getAllSiteService = async (params) => {
    const sites = await getAllSites(params);
    return sites;
  };
  
  export const getSingleSiteService = async (siteId) => {
    return await findSiteById(siteId);
  };
  
  export const updateExistingSiteService = async (
    siteID,
    body
  ) => {
    const existingSite = await findSiteById(siteID);
    if (!existingSite) return { status: 400, message: "Site not found" };
    const response = await updateExistingSiteByID(siteID, body);
    return response;
  };
  
  export const getTotalSiteCountByManagerService = async (managerId) => {
    const response = await getAllSites({ managerId });
    return response?.total;
  };
  