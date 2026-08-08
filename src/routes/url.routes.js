import express from "express";
import * as urlController from "../controllers/url.controller.js";

const router = express.Router();

router.post("/urls", urlController.createUrl);

export default router;