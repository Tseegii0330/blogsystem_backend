import db from "../../db.js";
import errorHandler from "../../utils/error.js";
import { isNil } from "../../utils/validations.js";

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
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

    const userById = await db.query(`SELECT * FROM users WHERE id = '${id}'`);

    if (isNil(userById)) {
      return res.status(400).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй",
      });
    }

    await db.query(`DELETE FROM users WHERE id = '${id}'`);

    return res.status(200).json({
      success: true,
      message: "Comment update successfuly",
    });
  } catch (error) {
    throw errorHandler(403, "error bad reques");
  }
};

export default deleteUser;
