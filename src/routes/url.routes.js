const express = require("express");

const router = express.Router();

const urlController = require("../controllers/url.controller");

router.post("/urls", urlController.createUrl);

module.exports = router;