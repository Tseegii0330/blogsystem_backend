import db from "../../db.js";

const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const result = await db.query(
      "SELECT * FROM email_verifications WHERE unique_str = $1",
      [token]
    );

    const existVerify = result.rows[0];
    if (!existVerify) return false;

    await db.query("UPDATE users SET is_verified = true WHERE id = $1", [
      existVerify.user_id,
    ]);
    await db.query("DELETE FROM email_verifications WHERE user_id = $1", [
      existVerify.user_id,
    ]);

    const findUser = await db.query("SELECT * FROM users WHERE id = $1", [
      existVerify.user_id,
    ]);
    if (!findUser) {
      return res.status(401).json({
        success: false,
        message: "Нэвтрэлт амжитгүй боллоо ахин оролдоно уу!",
      });
    }

    const user = findUser.rows[0];
    return res.status(200).json({
      success: true,
      message: "Амжилттай нэвтэрлээ",
      user: user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default verifyEmail;
