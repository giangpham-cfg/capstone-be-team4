import bcrypt from "bcrypt";
import { userData } from "./data.js";
import { prisma } from "../index.js";

async function seedDatabase() {
  try {
    await prisma.comment.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.recipe.deleteMany({});
    // seed users
    const users = [];
    for (let { username, password } of userData) {
      const hashedPassword = await bcrypt.hash(password, 10);
      users.push(
        prisma.user.create({
          data: {
            username,
            password: hashedPassword,
          },
        })
      );
    }

    const createdUsers = await Promise.all(users);

    const [jazz, ketsarin, chef] = users;

    // seed recipes
    const recipe1 = await prisma.recipe.create({
      data: {
        name: "Recipe 1",
        instruction: ["Step 1", "Step 2"],
        ingredients: ["Ingredient 1", "Ingredient 2"],
        mealTime: "BREAKFAST",
        cookTime: "30 minutes",
        userId: (await jazz).id,
      },
    });

    const recipe2 = await prisma.recipe.create({
      data: {
        name: "Recipe 2",
        instruction: ["Step 1", "Step 2", "Step 3"],
        ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
        mealTime: "LUNCH",
        cookTime: "45 minutes",
        userId: (await ketsarin).id,
      },
    });

    //seed comments
    const comment1 = await prisma.comment.create({
      data: {
        text: "This is a comment on Recipe 1",
        userId: (await ketsarin).id,
        recipeId: recipe1.id,
      },
    });

    const comment2 = await prisma.comment.create({
      data: {
        text: "This is a comment on Recipe 2",
        userId: (await chef).id,
        recipeId: recipe2.id,
      },
    });

    const favorite1 = await prisma.favoriteRecipe.create({
      data: {
        userId: (await chef).id,
        recipeId: recipe1.id,
      },
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.log("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
