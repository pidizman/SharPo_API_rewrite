import { text, integer, sqliteTable, blob } from "drizzle-orm/sqlite-core";
import { relations } from 'drizzle-orm';

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username"),
  email: text("email"),
  password: text("password"),
  signingKey: blob('blob', { mode: 'buffer' }),
  //signingKey: text("signingkey"),
  token: text("token")
});

export const userRelations = relations(users, ({ many }) => {
  posts: many(posts)
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey(),
  name: text("name"),
  created: text("created"),
  authorId: integer("authorId").notNull().references(() => users.id)
});

export const postRelations = relations(posts, ({ one }) => {
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  })
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;
