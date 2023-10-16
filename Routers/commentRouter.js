// import { Prisma, prisma } from "../index.js";
// import express from "express";
// import { userRouter } from "./userRouter.js";

// export const commentRouter = express.Router();

// commentRouter.get("/recipeId/:comment", async (req, res) => {
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

// commentRouter.post("/:recipeId/:comment", async (req, res) => {
//     const { name, text, userId } = req.body

//     try {
//         if (!name || !text) {
//             return res.send({
//                 sucess: false,
//                 error: "Please inclunding name and text for comment please."
//             })
//         }
//         const comment = await prisma.comment.create({
//             data: {
//                 name,
//                 text
//             }
//         })
//         res.send({
//             success: true,
//             comment
//         })
//     } catch (error) {
//         return res.send({
//             success: false,
//             error: error.message
//         })
//     }
// });
