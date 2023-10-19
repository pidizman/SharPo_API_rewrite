import { getToken } from "../db"

export const GetToken = async (id: number, token: string) => {
  const data = await getToken(id, token);

  if (data.length === 0) throw new Error("User doesn't exist");

  return null;
};
