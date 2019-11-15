const express = require("express");

const mutationController = require("../controllers/mutation");

const router = express.Router();

router.post("/", mutationController.hasMutation);

module.exports = router;
