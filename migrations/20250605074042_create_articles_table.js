/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable("articles", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.text("content");
    table.specificType("tags", "text[]");
    table.boolean("is_published").defaultTo(false);
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function down(knex) {
  await knex.schema.dropTable("articels");
}
