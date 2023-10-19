import { z } from "zod";
import { getUserData, UpdateUserData } from "../db";
import { User } from "../schema.db";
import { checkPassword, createToken, safeParse, sendError } from "../utility";

const login_schema = z.object({
  username: z.string(),
  password: z.string().min(8, "Password must have more than 8 characters")
});

export const Login = async ({ body, set }) => {
  try {
    const result = await safeParse(login_schema, body);
    await checkPassword(result.username, result.password);
  } catch (e: any) {
    set.status = 403;
    return sendError(e.message);
  };

  const data: Array<User> = await getUserData(body.username);
  const id = data[0].id;

  const obj = createToken(body.username as string);
  await UpdateUserData({
    token: obj.token,
    signingKey: obj.signingKey
  }, body.username);

  const return_json = {
    data: "Logined",
    token: obj.token,
    id: id
  };

  return return_json;
};
