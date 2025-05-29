import db from "../../db.js";
import errorHandler from "../../utils/error.js";
import { isNil } from "../../utils/validations.js";

const list = async (req, res) => {
  const likes = db.query("SELECT * FROM likes");

  if (isNil(likes)) {
    throw errorHandler(400, "Don`t hava any like");
  }

  console.log(likes.rows);

  res.status(200).json({
    success: true,
    result: likes.rows,
  });
};

export default list;
