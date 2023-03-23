const express = require('express')
const Recipe = require('../models/Recipe')
const router = express.Router({mergeParams:true})
const auth = require("../middlewear/auth.middlewear");

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);
    res.status(200).send(recipe);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    await Recipe.findByIdAndDelete({ _id: id });
    res.status(200).send(null);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;

    const existingRecipe = await Recipe.findOne({ name });

    if (existingRecipe) {
      return res
        .status(400)
        .json({ message: "Рецепт с таким названием уже есть в книге" });
    }

    const newRecipe = await Recipe.create({
      ...req.body,
    });

    res.status(201).send(newRecipe);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports=router