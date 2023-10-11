import Express from "express";
import {
  addNewSite,
  deleteExistingSite,
  getAllSites,
  getSingleSite,
  getTotalSiteCountByManager,
  updateExistingSite,
} from "../controllers/site";
import { verifyAccessToken } from "../middleware/authentication";

const siteRouter = Express.Router();

siteRouter.get("/", verifyAccessToken, getAllSites);
siteRouter.get("/count", verifyAccessToken, getTotalSiteCountByManager);
siteRouter.get("/:id", verifyAccessToken, getSingleSite);
siteRouter.post("/", verifyAccessToken, addNewSite);
siteRouter.delete("/:id", verifyAccessToken, deleteExistingSite);
siteRouter.patch("/:id", verifyAccessToken, updateExistingSite);

export default siteRouter;
