import { prisma } from "../index.js";
import express from "express";
import { userRouter } from "./userRouter.js";

export const recipeRouter = express.Router();

recipeRouter.get("/", async (req, res) => {
  try {
    console.log("GET/ recipes route start");

    const recipe = await prisma.recipe.findMany({
      include: {
        comments: true,

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

recipeRouter.get("/mealTime", async (req, res) => {
  try {
    //fetch mealTime
    const mealTime = await prisma.mealTime.findMany({
      include: {
        BREAKFAST: true,
        LUNCH: true,
        DINNER: true,
        DESSERT: true,
      },
    });
    res.send({
      success: true,
      mealTime,
    });
  } catch (error) {
    return res.send({
      success: false,
      error: error.message,
    });
  }
});

recipeRouter.get("/:recipeId", async (req, res) => {
  try {
    const { recipeId } = req.params;

    const recipes = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });
    res.send({
      success: true,
      recipes,
    });
  } catch (error) {
    return res.send({
      success: false,
      error: error.message,
    });
  }
});

//need to finish this
recipeRouter.put("/:recipeId", async (req, res) => {
  const { name, ingredients, instruction, mealTime, cookTime } = req.body;
  const { recipeId } = req.params;
  try {
    const recipeUpdate = await prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {},
    });
  } catch (error) {
    return res.send({
      success: false,
      error: error.message,
    });
  }
});

recipeRouter.delete(
  "/:recipeId",

  async (req, res) => {
    const { recipeId } = req.params;
    console.log(recipeId);
    try {
      //error handling
      const deleteCheck = await prisma.recipe.findUnique({
        where: { id: recipeId },
      });
      if (!deleteCheck) {
        return sen.send({
          success: false,
          error: "The recipe you are trying to edit does not exist",
        });
      }
      if (deleteCheck.userId !== req.user.id) {
        return res.send({
          success: false,
          error: "The recipe you are try to delete is not yours.",
        });
      }
      const reciep = await prisma.recipe.delete({
        where: {
          id: recipeId,
        },
      });
      res.send({
        success: true,
        reciep,
      });
    } catch (error) {
      return res.send({
        success: false,
        error: error.message,
      });
    }
  }
);

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
