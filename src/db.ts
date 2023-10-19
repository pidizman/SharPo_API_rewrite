import { drizzle, BunSQLiteDatabase } from 'drizzle-orm/bun-sqlite';
import Database from 'bun:sqlite';
import { InsertPost, InsertUser, users, posts } from "./schema.db";
import { and, eq } from 'drizzle-orm';

interface UpdateUser {
  username?: string;
  email?: string;
  password?: string;
  signingKey?: Buffer;
  token?: string;
};

export const sqlite = new Database('sqlite.db');
export const db: BunSQLiteDatabase = drizzle(sqlite);

//New user
export const insertUser = async (user: InsertUser) => await db
  .insert(users)
  .values(user);

//Get user data
export const getUserData = async (username: string) => await db
  .select()
  .from(users)
  .where(
    eq(users.username, username)
  );

//Update user data
export const UpdateUserData = async (data: UpdateUser, username: string) => await db
  .update(users)
  .set(data)
  .where(eq(users.username, username));

//Create new post
export const createNewPost = async (post: InsertPost) => await db
  .insert(posts)
  .values(post);

//Check if name of post is in use
export const getPostName = async (authorId: number, name: string) => await db
  .select({
    name: posts.name
  })
  .from(posts)
  .where(
    and(
      eq(posts.authorId, authorId),
      eq(posts.name, name)
    )
  );

//Get token
export const getToken = async (id: number, token: string) => await db
  .select({
    token: users.token
  })
  .from(users)
  .where(
    and(
      eq(users.id, id),
      eq(users.token, token)
    )
  );

//Get users post
export const getUserPosts = async (id: number) => await db
  .select()
  .from(posts)
  .where(
    eq(posts.authorId, id)
  );

//Check username
export const checkUsername = async (username: string) => await db
  .select()
  .from(users)
  .where(
    eq(users.username, username)
  );

//Check email
export const checkEmail = async (email: string) => await db
  .select()
  .from(users)
  .where(
    eq(users.email, email)
  );
