import { getPostName } from "../db";

export const checkPostName = async (authorID: number, name: string) => {
  const posts = await getPostName(authorID, name);

  if (posts.length !== 0) throw new Error("Gallery with this name already exist");

  return null;
};
