import { prisma } from "../index.js";
import express from "express";
import { userRouter } from "./userRouter.js";

export const recipeRouter = express.Router();

recipeRouter.get("/", async (req, res) => {
  try {
    console.log("GET/ recipes route start");

    const recipe = await prisma.recipe.findMany({
      include: {
        ingredients: true,
        comments: true,
        mealTime: true,
        cookTime: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    res.send({
      success: true,
      recipe,
    });
  } catch (error) {
    return res.send({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/recipes/submit: Allows users to create a new recipe.
recipeRouter.post("/:submit", async (req, res) => {
  try {
    const { name, instruction, ingredients, mealTime, cookTime } = req.body;
    // if (!name || instruction || ingredients || mealTime) {
    //   return res.send({
    //     success: false,
    //     error:
    //       "Please include name of recipe, instructor,ingredients,meal-time to create a post",
    //   });
    // }
    if (!req.user) {
      return res.send({
        success: false,
        error: "You must login to create post.",
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
    res.send({
      success: true,
      recipe,
    });
  } catch (error) {
    return res.send({
      success: true,
      error: error.message,
    });
  }
});

// recipeRouter.get("/recipeId/:comment", async (req, res) => {
//   console.log("Get /comment route started");
//   try {
//     const comment = await prisma.comment.findMany();
//     res.send({
//       success: true,
//       comment,
//     });
//   } catch (error) {
//     return res.send({
//       success: false,
//       error: error.message,
//     });
//   }
// });

// //POST

// recipeRouter.post("/:recipeId/:comment", async (req, res) => {
//   const { name, text, userId } = req.body;

//   try {
//     if (!name || !text) {
//       return res.send({
//         sucess: false,
//         error: "Please inclunding name and text for comment please.",
//       });
//     }
//     const comment = await prisma.comment.create({
//       data: {
//         name,
//         text,
//       },
//     });
//     res.send({
//       success: true,
//       comment,
//     });
//   } catch (error) {
//     return res.send({
//       success: false,
//       error: error.message,
//     });
//   }
// });
