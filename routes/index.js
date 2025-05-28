import express from "express";
const router = express.Router();
import apiLoginFunction from "../src/user/login.js";
import apiSignupFunction from "../src/user/singup.js";
import { verifyApiToken } from "../middleware/auth.js";
import createArticle from "../src/articles/createArticle.js";
import userList from "../src/user/users.js";
import { searchArticles, articlesList } from "../src/articles/articles.js";
import createComment from "../src/comments/createComment.js";

// const migration = require('../src/operator/migration')

/************************************************************
 *                                                          *
 *                     API service routes                   *
 *                                                          *
 *                                                          *
 ************************************************************/
// Public services

router.post("/login", apiLoginFunction);
router.post("/signup", apiSignupFunction);
router.get("/user/list", userList);
// router.get('/api/forget-password', apiForgetPasswordFunction)

// Article services
router.post("/articles", verifyApiToken, createArticle);
router.get("/articles", searchArticles);
router.post("/articles/:id/comments", verifyApiToken, createComment);
// Me services

/************************************************************
 *                                                          *
 *                     ADMIN service routes                 *
 *                                                          *
 *                                                          *
 ************************************************************/
// Public services
// router.get("/users", getUsers);

router.all("/", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
  next();
});

export default router;
