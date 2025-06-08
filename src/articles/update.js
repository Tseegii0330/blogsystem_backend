import db from "../../db.js";
import errorHandler from "../../utils/error.js";

const updateArticle = async (req, res) => {
  try {
    const { content, title, tags, is_published } = req.body;
    const user = req.authorizer;
    const id = req.params.id;
    let setVals = [];

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Please login",
      });
    }
    if (user.role !== "admin" && user.role !== "editor") {
      return res.status(403).json({
        success: false,
        message: "Permission denied. Only admin or editor can create articles.",
      });
    }
    const article = await db.query(`SELECT * FROM articles WHERE id = ${id}`);

    if (!article) {
      return res.status(400).json({ error: "Not fount article." });
    }

    if (content) {
      setVals.push(`content = '${content}'`);
    }
    if (title) {
      setVals.push(`title = '${title}'`);
    }
    if (tags && Array.isArray(tags)) {
      const tagArray = tags.map((t) => `'${t}'`).join(", ");
      setVals.push(`tags = ARRAY[${tagArray}]`);
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
