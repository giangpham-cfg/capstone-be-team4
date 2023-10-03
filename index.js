import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

const app = express();
export const prisma = new PrismaClient();
app.use(cors());
app.use(express.json()); // for parsing application/json

app.use(async (req, res, next) => {
  //check if theres an anth token in header and if it is valid
  try {
    if (!req.handle.authorization) {
      return next();
    }
    const token = req.headers.authorization.split(" ")[1];
    const { userId } = jwt.verify(token, process.env.JWT_SECRET); //check if token is valid
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return next();
    }
    delete user.password;
    req.user = user;
    next();
  } catch (error) {
    res.send({
      success: false,
      error: "Invalis token",
    });
  }
});
app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to recipe app",
  });
});

app.use((req, res) => {
  res.send({ success: false, error: "No route found." });
});

app.use((error, req, res, next) => {
  res.send({ success: false, error: error.message });
});
app.listen(3000, () => console.log("Server is runing on post 3000"));
