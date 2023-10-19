import { getUserData } from "../db";

export const checkUser = async (username: string) => {
  const data = await getUserData(username);

  if (data.length === 0) throw new Error("User doesn't exist");

  return null;
};
