import Express from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../index.js";
import bcrypt from "bcrypt";

export const userRouter = Express.Router();

userRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.send({
        success: false,
        error: "Please enter username and password to login",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      return res.send({
        success: false,
        error: "Username is invalid",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.send({
        success: false,
        error: "Password is invalid",
      });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.send({
      success: true,
      token,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkUser = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (checkUser) {
      return res.send({
        success: false,
        error: "The username already exists, please login",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,

        password: hashedPassword,
      },
    });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.send({
      success: true,
      token,
    });
  } catch (error) {
    return res.send({
      success: false,
      error: error.message,
    });
  }
});

userRouter.get("/token", async (req, res) => {
  try {
    res.send({
      success: true,
      user: req.body,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});
