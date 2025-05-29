import db from "../../db.js";
import { isNil } from "../../utils/validations.js";
import errorHandler from "../../utils/error.js";

const userList = async (req, res) => {
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
