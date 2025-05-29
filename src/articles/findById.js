import db from "../../db.js";
import { isNil } from "../../utils/validations.js";

const findById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Not found artcile",
      });
    }
    const article = await db.query(`SELECT * FROM articles WHERE id = '${id}'`);
    console.log(article);

    res.status(201).json({
      success: true,
      article: article.rows[0],
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export default findById;
