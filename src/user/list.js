import con from "../../db";

const getUsers = async (req, res) => {
  const result = await con.query("SELECT * FROM users");
  res.status(200).josn({
    success: true,
    users: result.rows,
  });
};

export default getUsers;
