import db from "../../db.js";
import errorHandler from "../../utils/error.js";
import { isNil } from "../../utils/validations.js";

const updateComment = async (req, res) => {
  const { content } = req.body;
  const { articleId, commentId } = req.params;
  const user = req.authorizer;

  if (isNil(user)) {
    return res.status(400).json({
      success: false,
      message: "Please login",
    });
  }

  const commentById = await db.query(
    `SELECT * FROM comments WHERE id = '${commentId}'`
  );
  console.log("id: ", commentById);

  if (
    user.role !== "admin" &&
    user.role !== "editor" &&
    commentById.rows[0].user_id !== user.id
  ) {
    return res.status(403).json({
      success: false,
      message: "Permission denied. Only admin, editor or update comment.",
    });
  }

  const article = await db.query(
    `SELECT * FROM articles WHERE id = '${articleId}'`
  );

  if (isNil(article)) {
    throw errorHandler(401, "Article not found");
  }

  const updatedComment = await db.query(
    `UPDATE comments SET content = '${content}' WHERE id = '${commentId}' RETURNING *`
  );

  return res.status(200).json({
    success: true,
    message: "Comment update successfuly",
    comment: updatedComment.rows[0],
  });
};

export default updateComment;
