const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const user = require("./routes/user");
const peoples = require("./routes/people");
const portofolios = require("./routes/portofolio");

const app = express();

mongoose
  .connect("mongodb://localhost/iit")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Could not connect to MongoDB...", err));

app.use(cors({ credentials: true, origin: "http://localhost:8000" }));
app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb" }));

app.use("/user", user);
app.use("/peoples", peoples);
app.use("/portofolios", portofolios);

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(port, () => {
  console.log(`Inkubator IT server is served at port ${port}`);
});
