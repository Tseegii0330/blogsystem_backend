import db from "../../db.js";
import errorHandler from "../../utils/error.js";
import { isNil } from "../../utils/validations.js";

const likes = async (req, res) => {
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

const createLike = async (req, res) => {
  try {
    const user = req.authorizer;
    const article_id = req.params.id;

    // Check if the like already exists
    const [existLike] = await db.query(
      "SELECT * FROM likes WHERE article_id = ? AND user_id = ?",
      [article_id, user.id]
    );

    if (existLike.length > 0) {
      // Like exists, so delete it (unlike)
      await db.query("DELETE FROM likes WHERE article_id = ? AND user_id = ?", [
        article_id,
        user.id,
      ]);
      return res.status(200).json({ success: true, message: "Like removed." });
    }

    // Like does not exist, so insert it
    await db.query("INSERT INTO likes (article_id, user_id) VALUES (?, ?)", [
      article_id,
      user.id,
    ]);

    res
      .status(201)
      .json({ success: true, message: "Like added successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { likes, createLike };
