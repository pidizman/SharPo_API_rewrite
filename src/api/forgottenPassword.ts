import { z } from "zod";
import { UpdateUserData } from "../db";
import { checkUser, safeParse, sendError } from "../utility";

const forgotten_schema = z.object({
  username: z.string().min(1),
  password: z.string().min(8, "Password must have more than 8 characters")
});

export const ForgottenPassword = async ({ body, set }) => {
  try {
    const result = await safeParse(forgotten_schema, body)
    await checkUser(result.username);
  } catch (e: any) {
    set.status = 403;
    return sendError(e.message)
  };

  const update_data = { password: body.password };
  await UpdateUserData(update_data, body.username as string);

  const return_json = {
    data: "Password changed"
  };
  return return_json;
};
