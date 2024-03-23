const express = require("express");
const router = express.Router();
const platformController = require("../controllers/platformController");

router.get("/platformlist", platformController.getAvailablePlatform);

module.exports = router;
