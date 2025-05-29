import db from "../../db.js";
import errorHandler from "../../utils/error.js";
import { isNil } from "../../utils/validations.js";

const commentsByArticleId = async (req, res) => {
  try {
    const id = req.params.id;

    if (isNil(id)) {
      return res.json({
        success: false,
        message: "Not found article",
      });
    }
    const article = await db.query(
      "SELECT * FROM comments WHERE article_id = $1",
      [id]
    );

    if (article.rows.length == 0) {
      return res.status(200).json({
        success: false,
        message: "No comment",
      });
    }

    return res.status(200).json({
      success: true,
      comments: article.rows,
    });
  } catch (error) {
    console.log("error: ", error);
    throw errorHandler(404, "error bad request");
  }
};

export default commentsByArticleId;
