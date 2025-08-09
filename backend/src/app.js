require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/database");
const { router } = require("./routes/url");
const cors = require("cors")
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("server isn't listening");
    console.log(err.message);
  });
