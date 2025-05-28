// const { comparePassword, generateToken } = require("../middleware/auth");
import errorHandler from "../../utils/error.js";
import con from "../../db.js";
import { comparePassword, generateToken } from "../../middleware/auth.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await con.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];
    if (isNil(user)) {
      throw errorHandler(404, "Customer not found!");
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      throw errorHandler(401, "Invalid password");
    }

    if (!isValid)
      return res.status(401).json({ error: "Имэйл эсвэл нууц үг буруу" });
    const tokenData = {
      id: customer._id.toString(),
      sub: customer.name,
      iss: "Ara-web",
      aud: "Ara-customer",
      data: {
        id: customer._id,
        name: customer.name ?? "Customer",
        phone: customer.phone ?? "-",
        avatar: customer.avatar,
        email: customer.email,
      },
    };

    return res.status(200).json({
      success: true,
      data: {
        token: generateToken(tokenData),
        changePasswordRequired: customer.changePasswordRequired || false,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default login;
