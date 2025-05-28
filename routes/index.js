import express from "express";
const router = express.Router();
import apiLoginFunction from "../src/user/login.js";
import apiSignupFunction from "../src/user/singup.js";
import getUsers from "../src/user/list.js";

// const migration = require('../src/operator/migration')

/************************************************************
 *                                                          *
 *                     API service routes                   *
 *                                                          *
 *                                                          *
 ************************************************************/
// Public services
router.get("/users", getUsers);
router.post("/login", apiLoginFunction);
router.post("/signup", apiSignupFunction);
// router.get('/api/forget-password', apiForgetPasswordFunction)

// Me services

/************************************************************
 *                                                          *
 *                     ADMIN service routes                 *
 *                                                          *
 *                                                          *
 ************************************************************/
// Public services

// HOST services

// TARIFF services

// router.get("/users", async (req, res) => {
//   try {
//     const result = await con.query("SELECT * FROM users");
//     res.json(result.rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
// router.get("/users", getUsers);
router.all("/", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
  next();
});

export default router;
