import db from "../../db.js";
import { isNil } from "../../utils/validations.js";
import errorHandler from "../../utils/error.js";

const PAGE_SIZE = 3;

export async function getArticles(req, res) {
  try {
    const { tags, author, page = 1 } = req.query;
    const limit = 3;
    const offset = (parseInt(page) - 1) * limit;

    let whereConditions = [];

    if (tags) {
      whereConditions.push(`'${tags}' = ANY (tags)`);
    }

    if (author) {
      const authorByname = await db.query(
        `SELECT id FROM users WHERE name = '${author}'`
      );

      if (authorByname.rows.length == 0) {
        return res.status(401).json({
          success: false,
          message: "Тус нэртэй нийтлэлч олдсонгүй.",
        });
      } else {
        const user_id = authorByname.rows[0].id;
        if (user_id) {
          whereConditions.push(`user_id = ${user_id}`);
        }
      }
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
      LIMIT ${PAGE_SIZE} OFFSET ${offset} 
    `;

    const countQuery = `
      SELECT COUNT(*) FROM articles
      ${whereClause}
    `;

    console.log("dataQuery: ", dataQuery);

    const result = await db.query(dataQuery);
    const countResult = await db.query(countQuery);
    const totalCount = parseInt(countResult.rows[0].count);

    const totalPages = Math.ceil(totalCount / limit);
    const hasPrevPage = page > 1;
    const nextPage = parseInt(page) + 1;
    const hasNextPage = offset + limit < totalCount;

    res.json({
      success: true,
      data: result.rows,
      page: parseInt(page),
      totalPages,
      totalCount,
      nextPage,
      hasPrevPage,
      hasNextPage,
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
