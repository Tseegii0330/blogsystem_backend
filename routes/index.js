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
import likes from "../src/likes/list.js";

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
router.get("/articles", getArticles);
router.post("/articles/:id/comments", verifyApiToken, createComment);
router.put("/articles/:id", verifyApiToken, updateArticle);
router.get("/likes", likes);
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
