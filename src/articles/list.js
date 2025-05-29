import db from "../../db.js";
import { isNil } from "../../utils/validations.js";
import errorHandler from "../../utils/error.js";

const PAGE_SIZE = 10;

export async function getArticles(req, res) {
  try {
    const { tags, author_id, page = 1 } = req.query;
    const limit = 10;
    const offset = (parseInt(page) - 1) * limit;

    let whereConditions = [];
    let values = [];

    if (tags) {
      whereConditions.push(`'${tags}' = ANY (tags)`);
    }

    if (author_id) {
      // values.push(author);
      // whereConditions.push(`author = $${values.length}`);

      const auhtors = await db.query(
        `SELECT * FROM articles WHERE author_id = ${author_id}`
      );
      whereConditions.push(`author_id = ${author_id}`);
      console.log("auhtors:", auhtors);
    }

    const whereClause =
      whereConditions.length > 0
        ? "WHERE " + whereConditions.join(" AND ")
        : "";
    console.log("whereClause:", whereClause);

    const dataQuery = `
      SELECT * FROM articles
      ${whereClause}
      ORDER BY created_at DESC
    `;

    const countQuery = `
      SELECT COUNT(*) FROM articles
      ${whereClause}
    `;

    const dataValues = [...values, limit, offset];

    console.log("dataQuery: ", dataQuery);

    const result = await db.query(dataQuery);

    // const totalCount = parseInt(countResult.rows[0].count, 10);
    // const totalPages = Math.ceil(totalCount / limit);

    res.json({
      success: true,
      data: result.rows,
      // page: parseInt(page),
      // totalPages,
      // totalCount,
      // articles: dataResult.rows,
    });
  } catch (err) {
    console.error("Error in getArticles:", err);
    res.status(500).json({ error: "Server error" });
  }
}

export const articlesList = async (req, res) => {
  const articles = db.query("SELECT * FROM articles");

  if (isNil(articles)) {
    throw errorHandler(400, "Articles don`t have");
  }
  res.status(200).json({
    success: true,
    lists: articles.rows,
  });
};
