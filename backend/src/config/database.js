const mongoose = require("mongoose");
const mongoUrl = process.env.DATABASE_URL;

const connectDB = async () => {
  return await mongoose.connect(mongoUrl);
};

module.exports = {
  connectDB,
};
