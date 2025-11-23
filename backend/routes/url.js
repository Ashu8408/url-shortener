const express = require("express");
const URL = require("../models/url");
const { handleGenerateNewShortURL, handleGetAnalytics, handleDeleteURL } = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/analytics/:shortId", handleGetAnalytics);
router.delete("/:shortId", handleDeleteURL);

router.get("/all", async (req, res) => {
    const all = await URL.find({});
    res.json(all);
});

module.exports = router;