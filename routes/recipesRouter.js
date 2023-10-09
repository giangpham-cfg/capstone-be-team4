import express from "express";
import { prisma } from "../index.js";

export const recipesRouter = express.Router();

//Get all recipes  route: /recipes

recipesRouter.get("/", async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        user: { select: { username: true, id: true } },
        comments: true,
      },
    });
    if (recipes.length === 0) {
      res.send({ success: false, message: "No recipes found in database" });
    } else {
      res.send({ success: true, recipes });
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});

//Get single recipe  route: recipes/recipeId

recipesRouter.get("/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params;

    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
      include: {
        user: { select: { username: true, id: true } },
        comments: true,
      },
    });
    res.send({ success: true, recipe });
  } catch (error) {}
});

// Create recipe  route: recipes/submit

recipesRouter.post("/submit", async (req, res) => {
  try {
    const { name, instruction, ingredients, mealTime, cookTime } = req.body;

    console.log(req.user);

    if (!req.user) {
      return res.send({
        success: false,
        error: "You must login to create a recipe.",
      });
    }

    const recipe = await prisma.recipe.create({
      data: {
        name,
        ingredients,
        instruction,
        mealTime,
        cookTime,
        userId: req.user.id,
      },
    });
    res.send({ success: true, recipe });
  } catch (error) {
    res.send({
      success: true,
      error: error.message,
    });
  }
});
