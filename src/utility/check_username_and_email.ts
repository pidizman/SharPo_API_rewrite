import { checkEmail, checkUsername } from "../db";

export const checkUsernameAndPassword = async (username: string, email: string) => {
  const name = await checkUsername(username);
  const mail = await checkEmail(email);

  if (name.length !== 0) throw new Error("Username is already used");
  if (mail.length !== 0) throw new Error("This email is already registred");

  return null;
};
