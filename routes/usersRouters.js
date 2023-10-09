import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../index.js";
export const usersRouter = express.Router();

// REGISTER USER  POST REQ  route: users/register

usersRouter.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      return res.send({
        success: false,
        error: "Username and password required",
      });
    }
    const checkUser = await prisma.user.findUnique({
      where: {
        username: trimmedUsername,
      },
    });
    if (checkUser) {
      return res.send({
        success: false,
        error: " Username already exists, please login.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username: trimmedUsername,
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

// LOGIN USER  POST REQ   route: users/login
usersRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.send({
        success: false,
        error: "You must provide a username or password when logging in.",
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
        error: "User and/or password is invalid",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.send({
        success: false,
        error: "User and/or password is invalid.",
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
      error: error.message,
    });
  }
});

// READ USER TOKEN  GET REQ   route: users/token
usersRouter.get("/token", async (req, res) => {
  try {
    res.send({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});
