const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  redirectUrl: {
    type: String,
    required: true,
    validate: {
      validator: (redirectUrl) => {
        return /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w\-./?%&=]*)?$/i.test(
          redirectUrl
        );
      },
      message: () => {
        return "Please provide a valid URL (starting with http:// or https://).";
      },
    },
  },
  shortCode: {
    type: String,
    unique: true,
  },
  visitedCount: {
    type: Number,
  },
});

const URL = mongoose.model("url", urlSchema);

module.exports = {
  URL,
};
