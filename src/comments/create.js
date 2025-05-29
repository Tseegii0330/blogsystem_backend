import db from "../../db.js";
import errorHandler from "../../utils/error.js";
import { isNil } from "../../utils/validations.js";

const createComment = async (req, res) => {
  const { content } = req.body;
  const article_id = req.params.id;
  const user = req.authorizer;

  if (isNil(user)) {
    return res.status(400).json({
      success: false,
      message: "Please login",
    });
  }

  const article = await db.query(
    `SELECT * FROM articles WHERE id = ${article_id}`
  );

  if (isNil(article)) {
    throw errorHandler(400, "Article not found");
  }

  const newComment = await db.query(
    "INSERT INTO comments (article_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
    [article_id, user.id, content]
  );

  return res.status(200).json({
    success: true,
    message: "Comment created successfuly",
    comment: newComment.rows[0],
  });
};

export default createComment;
