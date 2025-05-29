import db from "../../db.js";

const updateArticle = async (req, res) => {
  try {
    const { content, title, tag, isPublished } = req.body;
    // const user = req.authorizer;
    const id = req.params.id;
    let setVals = [];
    let params = [];

    const article = db.query(`SELECT * FROM articles WHERE id = ${id}`);

    console.log("article: ", article.rows[0]);

    if (content !== undefined) {
      setVals.push("content = ?");
      params.push(content);
    }
    if (title !== undefined) {
      setVals.push("title = ?");
      params.push(title);
    }
    if (tag !== undefined) {
      setVals.push("tag = ?");
      params.push(tag);
    }
    if (isPublished !== undefined) {
      setVals.push("isPublished = ?");
      params.push(isPublished);
    }

    if (setVals.length === 0) {
      return res.status(400).json({ error: "No fields to update." });
    }

    params.push(id);
    const sql = `UPDATE articles SET ${setVals.join(", ")} WHERE id = ?`;
    const [result] = await db.query(sql, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Article not found." });
    }

    res.status(200).json({
      success: true,
      message: "Article updated successfully.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default updateArticle;
