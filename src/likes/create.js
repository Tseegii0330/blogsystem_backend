import db from "../../db.js";
import errorHandler from "../../utils/error.js";

const createAndDeleteLike = async (req, res) => {
  try {
    const user = req.authorizer;
    const article_id = req.params.id;
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Please log in.",
      });
    }

    const checkLike = await db.query(
      `SELECT * FROM likes WHERE user_id = ${user.id}`
    );

    if (checkLike.rows[0]) {
      await db.query(
        "SELECT * FROM likes WHERE user_id = $1 AND article_id = $2",
        [user.id, article_id]
      );

      return res.status(200).json({
        success: true,
        message: "successfully unlike",
      });
    } else {
      await db.query(
        "INSERT INTO likes (user_id, article_id) VALUES ($1, $2)",
        [user.id, article_id]
      );

      return res.status(201).json({
        success: true,
        message: "Successfully liked",
      });
    }
  } catch (error) {
    throw errorHandler(404, "error");
  }
};

export default createAndDeleteLike;
