import db from "../../db.js";

const findByUserId = async (req, res) => {
  const id = req.params.id;
  const user = req.authorizer;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Not found artcile",
    });
  }
  if (isNil(user)) {
    return res.status(400).json({
      success: false,
      message: "Please login",
    });
  }

  if (user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Permission denied. Only admin deleted articles.",
    });
  }
  try {
    const user = await db.query(`SELECT * FROM users WHERE id = '${id}'`);

    res.status(201).json({
      success: true,
      article: user.rows[0],
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export default findByUserId;
