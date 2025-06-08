import db from "../../db.js";
import { isNil } from "../../utils/validations.js";
import errorHandler from "../../utils/error.js";

const userList = async (req, res) => {
  const user = req.authorizer;

  if (isNil(user)) {
    return res.status(400).json({
      success: false,
      message: "Please login",
    });
  }

  if (user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Permission denied. Only admin deleted articles.",
    });
  }

  try {
    const lists = await db.query("SELECT * FROM users");
    if (isNil(lists)) {
      errorHandler(404, "Bad request!");
    }

    res.status(200).json({
      success: true,
      list: lists.rows,
    });
  } catch (error) {}
};

export default userList;
