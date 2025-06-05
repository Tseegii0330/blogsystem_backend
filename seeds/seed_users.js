/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex("users").del();

  await knex("users").insert([
    {
      name: "Test Admin",
      email: "test@example.com",
      password: "Admin@123",
      role: "admin",
    },
    {
      name: "Teso",
      email: "teso@gmail.com",
      password: "Teso123",
      role: "admin",
    },
  ]);
}
