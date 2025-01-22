import express from "express";
import {
  handleGenerateNewShortUrl,
  handleRedirectShortId,
  handleGetAnalytics,
  homepage,
} from "../controllers/url.js";
const router = express.Router();

router.get("/", homepage);
router.post("/url", handleGenerateNewShortUrl);
router.get("/:shortId", handleRedirectShortId);
router.get("/analytics/:shortId", handleGetAnalytics);

export default router;
