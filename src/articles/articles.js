import con from "../../db.js";
import { isNil } from "../../utils/validations.js";
import errorHandler from "../../utils/error.js";

const PAGE_SIZE = 10;

export const searchArticles = async (req, res) => {
  try {
    const { tag, author, page = 1 } = req.query;
    let query = "SELECT * FROM articles WHERE 1=1";
    const params = [];
    let paramIndex = 1;

    if (tag) {
      query += ` AND $${paramIndex} = ANY(tags)`;
      params.push(tag);
      paramIndex++;
    }

    if (author) {
      const user = con.query(`SELECT * FROM users WHERE name=${author}`);
      console.log("user: ", user);

      query += ` AND author_id = $${paramIndex}`;
      params.push(author);
      paramIndex++;
    }
    query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${
      paramIndex + 1
    }`;
    params.push(PAGE_SIZE);
    params.push((parseInt(page) - 1) * PAGE_SIZE);

    const result = await con.query(query, params);
    res.status(200).json({
      success: true,
      articles: result.rows,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const articlesList = async (req, res) => {
  const articles = con.query("SELECT * FROM articles");

  if (isNil(articles)) {
    throw errorHandler(400, "Articles don`t have");
  }
  res.status(200).json({
    success: true,
    lists: articles.rows,
  });
};
