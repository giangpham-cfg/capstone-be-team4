import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { recipes, comments, userData } from "./data.js";
const prisma = new PrismaClient();

async function seedDatabase() {
  try {
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
    const recipe1 = await prisma.recipe.upsert({
      data: {
        name: "Recipe 1",
        instruction: ["Step 1", "Step 2"],
        ingredients: ["Ingredient 1", "Ingredient 2"],
        mealTime: "BREAKFAST",
        cookTime: "30 minutes",
        user: { connect: { id: jazz.id } },
      },
    });

    const recipe2 = await prisma.recipe.upsert({
      data: {
        name: "Recipe 2",
        instruction: ["Step 1", "Step 2"],
        ingredients: ["Ingredient 1", "Ingredient 2"],
        mealTime: "LUNCH",
        cookTime: "45 minutes",
        user: { connect: { id: ketsarin.id } },
      },
    });

    //seed comments
    const comment1 = await prisma.comment.upsert({
      data: {
        text: "This is a comment on Recipe 1",
        user: { connect: { id: chef.id } },
        Recipe: { connect: { id: recipe1.id } },
      },
    });

    const comment2 = await prisma.comment.upsert({
      data: {
        text: "This is a comment on Recipe 2",
        user: { connect: { id: jazz.id } },
        Recipe: { connect: { id: recipe2.id } },
      },
    });

    const favorite1 = await prisma.favoriteRecipe.upsert({
      data: {
        users: { connect: { id: chef.id } },
        recipes: { connect: { id: recipe1.id } },
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
