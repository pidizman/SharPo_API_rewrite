import { Elysia } from "elysia";
import { createNewPost, db, getPostName } from "./db";
import { Routes } from "./routes";
import { Post, posts, users } from "./schema.db";

const app = new Elysia();

app.get("/", async () => {
  //console.log(await db.select().from(users).all());
  //await db.delete(users);
  const data = await db.select().from(users).all();

  return data;
});

Routes.map((v) => {
  app[v.method](v.name, v.handler);
});

app.listen(9090);

console.log(
  `Running at ${app.server?.hostname}:${app.server?.port}`
);
