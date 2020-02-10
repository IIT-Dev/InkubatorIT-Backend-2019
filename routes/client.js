const express = require("express");
const mongoose = require("mongoose");

const withAuth = require("../helpers/withAuth");

const router = express.Router();

const clientSchema = new mongoose.Schema({
  name: String,
  imageUrl: String
});

const Client = mongoose.model("Client", clientSchema);

router.get("/", async (req, res) => {
  const clients = await Client.find();
  res.send(clients);
});

router.post("/", withAuth, async (req, res) => {
  const { name, imageUrl } = req.body;

  let client = new Client({
    name,
    imageUrl
  });

  client = await client.save();

  res.send(client);
});

router.get("/:id", async (req, res) => {
  const client = await Client.findById(req.params.id);
  if (!client)
    return res.status(404).send("The client with given id is not exist");

  res.send(client);
});

router.put("/:id", withAuth, async (req, res) => {
  let client = await Client.findById(req.params.id);
  if (!client)
    return res.status(404).send("The client with given id is not exist");

  const { name, imageUrl } = req.body;

  client = await Client.findByIdAndUpdate(
    req.params.id,
    {
      name,
      imageUrl
    },
    { new: true }
  );

  if (!client)
    return res
      .status(404)
      .send("The client with the given ID was not found.");

  res.send(client);
});

router.delete("/:id", withAuth, async (req, res) => {
  const client = await Client.findByIdAndRemove(req.params.id);
  if (!client)
    return res.status(404).send("The client with given id is not exist");

  res.send(client);
});

module.exports = router;
