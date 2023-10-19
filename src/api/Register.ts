import { z } from "zod";
import { getUserData, insertUser } from "../db";
import { checkUsernameAndPassword, createToken, safeParse, sendError } from "../utility";

const register_schema = z.object({
  email: z.string().email("Invalid email schema"),
  username: z.string().min(1),
  password: z.string().min(8, "Password must have more than 8 characters")
});

export const Register = async ({ body, set }) => {
  try {
    const result = await safeParse(register_schema, body);
    await checkUsernameAndPassword(result.username, result.email);
  } catch (e: any) {
    set.status = 403;

    return sendError(e.message);
  };

  const obj = createToken(body.username as string);
  const password = await Bun.password.hash(body.password);

  await insertUser({
    username: body.username,
    email: body.email,
    password: password,
    signingKey: obj?.signingKey,
    token: obj.token
  });

  const data = await getUserData(body.username);

  const return_json = {
    data: "Logined",
    token: data[0].token,
    id: data[0].id
  };

  return return_json;
};
