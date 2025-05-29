import db from "../../db.js";
import errorHandler from "../../utils/error.js";

const deleteArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.authorizer;

    if (!id) {
      throw errorHandler(400, "not found article");
    }

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
    const existArticle = await db.query(
      `SELECT * FROM articles WHERE id = '${id}'`
    );
    console.log("existArticle: ", existArticle.rows.length);

    if (existArticle.rows.length == 0) {
      return res
        .status(400)
        .json({ success: false, message: "not found article" });
    }
    await db.query(`DELETE FROM articles WHERE id = '${id}'`);

    const deletedArticleTitle = existArticle.rows[0].title;

    return res.status(200).json({
      success: true,
      message: `${deletedArticleTitle} is deleted successfully`,
    });
  } catch (error) {
    throw errorHandler(404, "Error bad request");
  }
};

export default deleteArticle;
