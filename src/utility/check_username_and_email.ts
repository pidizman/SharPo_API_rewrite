import { checkEmail, checkUsername } from "../db";

export const checkUsernameAndEmail = async (
  username: string,
  email: string,
) => {
  const name = await checkUsername(username);
  const mail = await checkEmail(email);

  if (mail.length !== 0) throw new Error("This email is already registred");
  if (name.length !== 0) throw new Error("Username is already used");

  return null;
};
