import express from "express";
const router = express.Router();
import apiLoginFunction from "../src/user/login.js";
import apiSignupFunction from "../src/user/singup.js";
import { verifyApiToken } from "../middleware/auth.js";
import createArticle from "../src/articles/create.js";
import userList from "../src/user/list.js";
import { getArticles, articlesList } from "../src/articles/list.js";
import createComment from "../src/comments/create.js";
import updateArticle from "../src/articles/update.js";
import likeCounts from "../src/likes/likeCounts.js";
import commentsByArticleId from "../src/comments/list.js";
import deleteArticle from "../src/articles/delete.js";
import findById from "../src/articles/findById.js";
import createAndDeleteLike from "../src/likes/create.js";
import updateComment from "../src/comments/update.js";
import deleteComment from "../src/comments/delete.js";
import verifyEmail from "../src/user/verifyEmail.js";
import updateUser from "../src/user/update.js";
import deleteUser from "../src/user/delete.js";

/************************************************************
 *                                                          *
 *                     API service routes                   *
 *                                                          *
 *                                                          *
 ************************************************************/
// Public services

router.post("/login", apiLoginFunction);
router.post("/signup", apiSignupFunction);
router.get("/users/list", userList);
router.put("/users/:id", verifyApiToken, updateUser);
router.delete("/users/:id", verifyApiToken, deleteUser);

// router.get('/forget-password', apiForgetPasswordFunction)

//email verify

router.get("/verify-email", verifyEmail);

// Article services
router.post("/articles", verifyApiToken, createArticle);
router.get("/articles", getArticles);
router.get("/articles/:id", findById);
router.put("/articles/:id", verifyApiToken, updateArticle);
router.delete("/articles/:id", verifyApiToken, deleteArticle);
router.post("/articles/:id/comments", verifyApiToken, createComment);
router.get("/articles/:id/comments", commentsByArticleId);
router.put(
  "/articles/:articleId/comments/:commentId",
  verifyApiToken,
  updateComment
);
router.delete(
  "/articles/:articleId/comments/:commentId",
  verifyApiToken,
  deleteComment
);
router.get("/articles/:id/likes", likeCounts);
router.post("/articles/:id/likes", verifyApiToken, createAndDeleteLike);

router.all("/", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
  next();
});

export default router;
