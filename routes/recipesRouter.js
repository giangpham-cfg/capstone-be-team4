import express from "express";
import { prisma } from "../index.js";

export const recipesRouter = express.Router();

//Get all recipes  route: /recipes

recipesRouter.get("/", async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: true,
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
        ingredients: true,
        user: { select: { username: true, id: true } },
        comments: true,
      },
    });
    res.send({ success: true, recipe });
  } catch (error) {}
});

// create recipe  route: recipes/submit

// recipesRouter.post("/submit", async (req, res) => {
//   try {
//     const { name, instruction, mealTime } = req.body;
//     const recipe = await prisma.recipe.findUnique({
//       where: {
//         id: recipeId,
//       },
//       include: {
//         ingredients: true,
//         user: { select: { username: true, id: true } },
//         comments: true,
//       },
//     });
//     res.send({ success: true, recipe });
//   } catch (error) {}
// });
