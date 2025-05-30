// const { comparePassword, generateToken } = require("../middleware/auth");
import errorHandler from "../../utils/error.js";
import db from "../../db.js";
import { isNil } from "../../utils/validations.js";
import { comparePassword, generateToken } from "../../middleware/auth.js";
import sendVerificationEmail from "../../utils/sendVerificationEmail.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  let count = 0;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (isNil(user)) {
      throw errorHandler(404, "User not found!");
    }

    const passCheck = await comparePassword(password, user.password);
    if (!passCheck) {
      count++;
      throw errorHandler(401, "Invalid password");
    }

    if (!passCheck)
      return res.status(401).json({ error: "Имэйл эсвэл нууц үг буруу" });

    const tokenData = {
      id: user.id.toString(),
      sub: user.name,
      iss: "blog_system",
      aud: "blog_user",
      data: {
        id: user.id,
        name: user.name ?? "User",
        email: user.email,
        role: user.role,
      },
    };

    if (!user.is_verified) {
      const verfyToken = generateToken(tokenData);

      await db.query(
        `INSERT INTO email_verifications (user_id, unique_str)
         VALUES ($1, $2)
         ON CONFLICT (user_id) DO UPDATE SET unique_str = EXCLUDED.unique_str, updated_at = CURRENT_TIMESTAMP`,
        [user.id, verfyToken]
      );

      await sendVerificationEmail(user.email, verfyToken);

      return res.status(401).json({
        success: false,
        error: "Имэйл баталгаажаагүй байна. Та и-мэйлээ шалгана уу.",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user: user,
        token: generateToken(tokenData),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default login;
