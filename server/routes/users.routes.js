const express = require("express");
const User = require("../models/User.js");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
