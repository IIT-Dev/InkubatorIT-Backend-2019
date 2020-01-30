const express = require("express");
const mongoose = require("mongoose");

const withAuth = require("../helpers/withAuth");

const router = express.Router();

const portofolioSchema = new mongoose.Schema({
  title: String,
  platform: String,
  description: String,
  imageUrl: String
});

const Portofolio = mongoose.model("Portofolio", portofolioSchema);

router.get("/", async (req, res) => {
  const portofolios = await Portofolio.find();
  res.send(portofolios);
});

router.post("/", withAuth, async (req, res) => {
  const { title, platform, description, imageUrl } = req.body;

  let portofolio = new Portofolio({
    title,
    platform,
    description,
    imageUrl
  });

  portofolio = await portofolio.save();

  res.send(portofolio);
});

router.get("/:id", async (req, res) => {
  const portofolio = await Portofolio.findById(req.params.id);
  if (!portofolio)
    return res.status(404).send("The portofolio with given id is not exist");

  res.send(portofolio);
});

router.put("/:id", withAuth, async (req, res) => {
  let portofolio = await Portofolio.findById(req.params.id);
  if (!portofolio)
    return res.status(404).send("The portofolio with given id is not exist");

  const { title, platform, description, imageUrl } = req.body;

  portofolio = await Portofolio.findByIdAndUpdate(
    req.params.id,
    {
      title,
      platform,
      description,
      imageUrl
    },
    { new: true }
  );

  if (!portofolio)
    return res
      .status(404)
      .send("The portofolio with the given ID was not found.");

  res.send(portofolio);
});

router.delete("/:id", withAuth, async (req, res) => {
  const portofolio = await Portofolio.findByIdAndRemove(req.params.id);
  if (!portofolio)
    return res.status(404).send("The portofolio with given id is not exist");

  res.send(portofolio);
});

module.exports = router;
