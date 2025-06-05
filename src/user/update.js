import db from "../../db.js";
import errorHandler from "../../utils/error.js";
import { isNil, validateEmail } from "../../utils/validations.js";

const updateUser = async (req, res) => {
  const { email, is_verified = false, name, role } = req.body;
  const { id } = req.params;
  const user = req.authorizer;
  console.log("user: ", user);

  let setVals = [];

  if (isNil(user)) {
    return res.status(400).json({
      success: false,
      message: "Please login",
    });
  }

  if (user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Permission denied. Only admin.",
    });
  }
  const findUser = await db.query(`SELECT * FROM users WHERE id = '${id}'`);

  if (isNil(findUser)) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  if (name) {
    setVals.push(`name = '${name}'`);
  }

  if (!is_verified) {
    setVals.push(`is_verified = ${is_verified}`);
  }
  if (role) {
    setVals.push(`role = '${role}'`);
  }
  if (!isNil(email) && validateEmail(email)) {
    setVals.push(`email = '${email}'`);
  }

  if (setVals.length === 0) {
    return res.status(400).json({ error: "No fields to update." });
  }

  const updatedUser = await db.query(
    `UPDATE users SET ${setVals.join(", ")} WHERE id = '${id}' RETURNING *`
  );

  return res.status(200).json({
    success: true,
    message: "User update successfuly",
    comment: updatedUser.rows[0],
  });
};

export default updateUser;
