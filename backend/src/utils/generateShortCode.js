const shortid = require("shortid");

const generateShortCode = () => {
  const shortCode = shortid.generate();
  return shortCode;
};

module.exports = {
  generateShortCode,
};
