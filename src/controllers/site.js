import {
    addNewSiteService,
    deleteExistingSiteService,
    getAllSiteService,
    getSingleSiteService,
    getTotalSiteCountByManagerService,
    updateExistingSiteService,
  } from "../services/siteService";
  import { makeResponse } from "../utils/response";
  
  export const addNewSite = async (req, res) => {
    const response = await addNewSiteService(req.body);
    if (!response)
      return makeResponse({ res, status: 400, message: "Something went wrong" });
    if (response.status) return makeResponse({ res, ...response });
    makeResponse({
      res,
      status: 200,
      data: response,
      message: "Site added successfully",
    });
  };
  
  export const deleteExistingSite = async (req, res) => {
    const response = await deleteExistingSiteService(req.params.id);
    if (!response)
      return makeResponse({ res, status: 400, message: "Something went wrong" });
    if (response.status) return makeResponse({ res, ...response });
    makeResponse({
      res,
      status: 200,
      data: response,
      message: "Site deleted successfully",
    });
  };
  
  export const getAllSites = async (req, res) => {
    const params = req.query;
    const sites = await getAllSiteService(params);
    if (!sites)
      return makeResponse({ res, status: 400, message: "Something went wrong" });
    makeResponse({
      res,
      status: 200,
      data: sites,
      message: "Sites fetched successfully",
    });
  };
  
  export const getSingleSite = async (req, res) => {
    const response = await getSingleSiteService(req.params.id);
    if (!response)
      return makeResponse({ res, status: 400, message: "Something went wrong" });
    makeResponse({
      res,
      status: 200,
      data: response,
      message: "Site fetched successfully",
    });
  };
  
  export const updateExistingSite = async (req, res) => {
    const siteId = req.params.id;
    const body = req.body;
  
    const response = await updateExistingSiteService(siteId, body);
    if (!response)
      return makeResponse({ res, status: 400, message: "Something went wrong" });
    if (response.status) return makeResponse({ res, ...response });
    makeResponse({
      res,
      status: 200,
      data: response,
      message: "Site updated successfully",
    });
  };
  
  export const getTotalSiteCountByManager = async (req, res) => {
    const id = req.params.manager;
    const Sites = await getTotalSiteCountByManagerService(id);
    if (!Sites)
      return makeResponse({ res, status: 400, message: "Something went wrong" });
    makeResponse({
      res,
      status: 200,
      data: Sites,
      message: "Site fetched successfully",
    });
  };
  