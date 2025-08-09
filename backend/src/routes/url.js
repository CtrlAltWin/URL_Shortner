const express = require("express");
const router = express.Router();
const { generateShortCode } = require("../utils/generateShortCode");
const { urlValidator } = require("../utils/urlValidator");
const { URL } = require("../models/url");
const baseUrl = process.env.BACKEND_URL;

router.post("/", async (req, res) => {
  try {
    const redirectUrl = req.body.redirectUrl;
    if (!redirectUrl) {
      return res.status(400).json({
        error: "url is required",
      });
    }
    const isValid = urlValidator(redirectUrl);
    if (!isValid) {
      return res.status(400).json({
        error: "url is not valid",
      });
    }
    const shortCode = generateShortCode();
    const url = new URL({
      shortCode,
      redirectUrl,
      visitedCount: 0,
    });
    await url.save();
    res.json({
      message: "success",
      shortUrl: `${baseUrl}/${shortCode}`,
    });
  } catch (err) {
    res.status(500).json({ error: "error shortening the url" });
  }
});

router.get("/history", async (req, res) => {
  try {
    const urls = await URL.find();
    res.json({
      message: "Url history",
      urls,
    });
  } catch (err) {
    res.status(500).json({ error: "error fetching the url history" });
  }
});

router.get("/:shortCode", async (req, res) => {
  try {
    const shortCode = req.params.shortCode;
    const url = await URL.findOneAndUpdate(
      {
        shortCode,
      },
      {
        $inc: {
          visitedCount: 1,
        },
      },
      {
        new: true,
      }
    );
    if (!url) {
      return res.status(404).json({ error: "url not found", url });
    }
    res.redirect(url.redirectUrl);
  } catch (err) {
    res.status(500).json({ error: "error redirecting to the url" });
  }
});

module.exports = {
  router,
};
