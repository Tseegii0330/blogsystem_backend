import db from "../../db.js";
import { hashPassword } from "../../middleware/auth.js";
import {
  isNil,
  validateEmail,
  validateString,
} from "../../utils/validations.js";
import errorHandler from "../../utils/error.js";

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (isNil(email) || !validateEmail(email)) {
    throw errorHandler(400, "Email required!");
  }
  if (isNil(password) || !validateString(password, 12, 8)) {
    throw errorHandler(400, "Password required! or Password length 8 or more");
  }
  if (isNil(name) || !validateString(name, 50, 1)) {
    throw errorHandler(400, "Name required!");
  }

  try {
    const existingUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (isNil(existingUser)) {
      throw errorHandler(400, "Email already registred!");
    }
    const hashedPassword = await hashPassword(password, 10);
    const newUser = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, role || "reader"]
    );

    res.status(201).json({
      success: true,
      message: "Амжилттай бүртгэгдлээ",
      user: newUser.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default register;
