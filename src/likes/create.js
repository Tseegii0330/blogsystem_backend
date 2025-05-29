import con from "../../db.js";

const createLike = async (req, res) => {
  const user = req.authorizer;
  const article_id = req.params.id;

  const existLike = con.query(`SELECT * FROM likes WHERE article_id = {}`);
};
