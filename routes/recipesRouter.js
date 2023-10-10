import express from "express";
import { prisma } from "../index.js";

export const recipesRouter = express.Router();

//Get all recipes  route: /recipes

recipesRouter.get("/", async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        user: { select: { username: true, id: true } },
        comments: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
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

//Get recipes by mealTime (BFAST,LUNCH,DINNER,DESSERT) route: recipes/:mealtype

recipesRouter.get("/:mealTime", async (req, res) => {
  try {
    const { mealTime } = req.params;
    //do i need an additional checker to see if enum is valid??
    const recipesByMealTime = await prisma.recipe.findMany({
      where: {
        mealTime: mealTime.toUpperCase(), // so even if you type recipes/breakfast, it will still werq
      },
      include: {
        user: { select: { username: true, id: true } },
        comments: {
          include: {
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    if (recipesByMealTime.length === 0) {
      res.send({ success: false, message: "No recipes found in database" });
    } else {
      res.send({ success: true, recipesByMealTime });
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
        comments: {
          include: {
            user: true,
          },
        },
        // comments: { select: { username: true } },
      },
    });
    res.send({ success: true, recipe });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        error: "Recipe not found",
      });
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
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

//Add Favorite recipe  route: recipes/:recipeId/favorite

recipesRouter.post("/:recipeId/favorite", async (req, res) => {
  try {
    const { recipeId } = req.params;

    //check if recipe that user wants to favorite exist incase recipe is deleted
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    //user not logged in
    if (!req.user) {
      return res.send({
        success: false,
        error: "Please login to favorite this recipe",
      });
    }

    if (!recipe) {
      return res.send({ success: false, error: "Recipe not found" });
    }

    const existingFavorite = await prisma.favoriteRecipe.findUnique({
      where: {
        userId_recipeId: {
          userId: req.user.id,
          recipeId,
        },
      },
    });

    if (existingFavorite) {
      return res.send({
        success: false,
        error: "Recipe already favorited by User",
      });
    }

    const addFavorite = await prisma.favoriteRecipe.create({
      data: {
        userId: req.user.id,
        recipeId,
      },
    });

    res.send({ success: true, addFavorite });
  } catch (error) {
    console.error("Error favoriting recipe:", error);
    res.send({ success: false, error: error.message });
  }
});

//Remove Favorite recipe  route: recipes/:recipeId/favorite

recipesRouter.delete("/:recipeId/favorite", async (req, res) => {
  try {
    const { recipeId } = req.params;
    //check if recipe that user wants to favorite exist incase recipe is deleted
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    //user not logged in
    if (!req.user) {
      return res.send({
        success: false,
        error: "Please login to unfavorite this recipe",
      });
    }

    if (!recipe) {
      return res.send({ success: false, error: "Recipe not found" });
    }

    const existingFavorite = await prisma.favoriteRecipe.findUnique({
      where: {
        userId_recipeId: {
          userId: req.user.id,
          recipeId,
        },
      },
    });

    const removeFavorite = await prisma.favoriteRecipe.delete({
      where: {
        id: existingFavorite.id,
      },
    });

    res.send({ success: true, removeFavorite });
  } catch (error) {
    console.error("Error unfavoriting recipe:", error);
    res.send({ success: false, error: error.message });
  }
});

//Add comment to recipe  route: recipes/:recipeId/comments

recipesRouter.post("/:recipeId/comments", async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { text } = req.body;

    //user not logged in
    if (!req.user) {
      return res.send({
        success: false,
        error: "Please login to comment.",
      });
    }
    //check if recipe that user wants to comment on exist incase recipe is deleted
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      return res.send({ success: false, error: "Recipe not found" });
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        userId: req.user.id,
        recipeId,
      },
    });

    res.send({ success: true, comment });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
});
