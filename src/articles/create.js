import db from "../../db.js";
import { isNil } from "../../utils/validations.js";

const createArticle = async (req, res) => {
  try {
    const user = req.authorizer;

    if (!user || (user.role !== "admin" && user.role !== "editor")) {
      return res.status(403).json({
        success: false,
        message: "Permission denied. Only admin or editor can create articles.",
      });
    }

    const { title, content, tags, is_published } = req.body;
    console.log("body: ", req.body);

    if (isNil(title) || isNil(content)) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required.",
      });
    }

    const result = await db.query(
      "INSERT INTO articles (title, content, tags, author_id, is_published, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
      [title, content, tags || [], user.id, is_published]
    );

    res.status(201).json({
      success: true,
      article: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export default createArticle;
