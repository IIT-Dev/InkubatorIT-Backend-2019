const express = require("express");
const mongoose = require("mongoose");

const withAuth = require("../helpers/withAuth");

const router = express.Router();

const peopleSchema = new mongoose.Schema({
  name: String,
  role: String,
  description: String,
  imageUrl: String
});

const People = mongoose.model("People", peopleSchema);

router.get("/", async (req, res) => {
  const peoples = await People.find();
  res.send(peoples);
});

router.post("/", withAuth, async (req, res) => {
  console.log(req.body);

  const { imageUrl, name, role } = req.body;

  let people = new People({
    name,
    role,
    imageUrl
  });

  people = await people.save();

  res.send(people);
});

router.get("/:id", async (req, res) => {
  const people = await People.findById(req.params.id);
  if (!people)
    return res.status(404).send("The people with given id is not exist");

  res.send(people);
});

router.put("/:id", withAuth, async (req, res) => {
  let people = await People.findById(req.params.id);
  if (!people)
    return res.status(404).send("The people with given id is not exist");

  const { imageUrl, name, role } = req.body;

  people = await People.findByIdAndUpdate(
    req.params.id,
    {
      name,
      role,
      imageUrl
    },
    { new: true }
  );

  if (!people)
    return res.status(404).send("The people with the given ID was not found.");

  res.send(people);
});

router.delete("/:id", withAuth, async (req, res) => {
  const people = await People.findByIdAndRemove(req.params.id);
  if (!people)
    return res.status(404).send("The people with given id is not exist");

  res.send(people);
});

module.exports = router;
