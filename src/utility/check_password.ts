import { getUserData } from "../db";

export const checkPassword = async (username: string, password: string) => {

  const data = await getUserData(username);

  if (data.length === 0) throw new Error("User with this username doesn't exist");

  const isMatch: boolean = await Bun.password.verify(password, data[0].password as string);

  if (isMatch !== true) throw new Error("Wrong password");

  return data;
};
