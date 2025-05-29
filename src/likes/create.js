import db from "../../db.js";

const createLike = async (req, res) => {
  const user = req.authorizer;
  const article_id = req.params.id;

  const existLike = db.query(`SELECT * FROM likes WHERE article_id = {}`);
};

export default createLike;
