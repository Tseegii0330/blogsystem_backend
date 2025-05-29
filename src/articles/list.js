import con from "../../db.js";
import { isNil } from "../../utils/validations.js";
import errorHandler from "../../utils/error.js";

const PAGE_SIZE = 10;

// export const searchArticles = async (req, res) => {
//   try {
//     const { tag, author, page = 1 } = req.query;
//     let query = "SELECT * FROM articles WHERE 1=1";
//     const params = [];
//     let paramIndex = 1;

//     if (tag) {
//       query += ` AND $${paramIndex} = ANY(tags)`;
//       params.push(tag);
//       paramIndex++;
//     }

//     if (author) {
//       const user = con.query(`SELECT * FROM users WHERE name=${author}`);
//       console.log("user: ", user);

//       query += ` AND author_id = $${paramIndex}`;
//       params.push(author);
//       paramIndex++;
//     }
//     query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${
//       paramIndex + 1
//     }`;
//     params.push(PAGE_SIZE);
//     params.push((parseInt(page) - 1) * PAGE_SIZE);

//     const result = await con.query(query, params);
//     res.status(200).json({
//       success: true,
//       articles: result.rows,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

export async function getArticles(req, res) {
  try {
    const { tag, author, page = 1 } = req.query;
    const limit = 10;
    const offset = (parseInt(page) - 1) * limit;

    let whereConditions = [];
    let values = [];

    if (tag) {
      values.push(tag);
      whereConditions.push(`tag = $${values.length}`);
    }

    if (author) {
      values.push(author);
      whereConditions.push(`author = $${values.length}`);
    }

    const whereClause =
      whereConditions.length > 0
        ? "WHERE " + whereConditions.join(" AND ")
        : "";

    const dataQuery = `
      SELECT * FROM articles
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `;

    const countQuery = `
      SELECT COUNT(*) FROM articles
      ${whereClause}
    `;

    const dataValues = [...values, limit, offset];

    const [dataResult, countResult] = await Promise.all([
      con.query(dataQuery, dataValues),
      con.query(countQuery, values),
    ]);

    const totalCount = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      page: parseInt(page),
      totalPages,
      totalCount,
      articles: dataResult.rows,
    });
  } catch (err) {
    console.error("Error in getArticles:", err);
    res.status(500).json({ error: "Server error" });
  }
}

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
