import express from "express";
import * as urlController from "../controllers/url.controller.js";
import { validateUrl } from "../middlewares/validate-url.middleware.js";

const router = express.Router();


router.get("/urls", urlController.getAllUrls);

router.get(
    "/urls/:shortCode/stats",
    urlController.getUrlStats
);

router.get(
    "/urls/:shortCode",
    urlController.getUrl
);

router.get(
    "/:shortCode",
    urlController.redirectUrl
);


router.post(
    "/urls",
    validateUrl,
    urlController.createUrl
);


router.patch(
    "/urls/:shortCode",
    validateUrl,
    urlController.updateUrl
);


router.delete(
    "/urls/:shortCode",
    urlController.deleteUrl
);

export default router;