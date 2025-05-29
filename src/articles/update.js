import db from "../../db.js";
import errorHandler from "../../utils/error.js";

const updateArticle = async (req, res) => {
  try {
    const { content, title, tags, is_published } = req.body;
    const user = req.authorizer;
    const id = req.params.id;
    let setVals = [];

    if (!user || (user.role !== "admin" && user.role !== "editor")) {
      return res.status(403).json({
        success: false,
        message: "Permission denied. Only admin or editor can create articles.",
      });
    }
    const article = await db.query(`SELECT * FROM articles WHERE id = ${id}`);
    const pushedTagLength =
      article.rows[0].tags.length == 0
        ? article.rows[0].tags.length
        : article.rows[0].tags.length + 1;

    if (!article) {
      return res.status(400).json({ error: "Not fount article." });
    }

    if (content) {
      setVals.push(`content = '${content}'`);
    }
    if (title) {
      setVals.push(`title = '${title}'`);
    }
    if (tags) {
      setVals.push(`tags[${pushedTagLength}] = '${tags}'`);
    }
    if (is_published) {
      setVals.push(`is_published = ${is_published}`);
    }

    if (setVals.length === 0) {
      return res.status(400).json({ error: "No fields to update." });
    }

    console.log("setVals: ", setVals.join(", "));

    const sql = `UPDATE articles SET ${setVals.join(", ")} WHERE id = ${id}`;

    await db.query(sql);

    return res.status(200).json({
      success: true,
      message: "Article updated successfully.",
      result: "",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default updateArticle;
