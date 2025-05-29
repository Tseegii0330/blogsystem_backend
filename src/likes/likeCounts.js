import db from "../../db.js";

const likeCounts = async (req, res) => {
  const article_id = req.params.id;

  const likes = await db.query(
    `SELECT COUNT (*) FROM likes WHERE article_id = '${article_id}'`
  );

  const likeCount = likes.rows[0].count;

  console.log("count: ", likeCount);

  return res.status(200).json({
    success: true,
    counts: likeCount,
  });
};

export default likeCounts;
