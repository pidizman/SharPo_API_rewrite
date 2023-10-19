import { z } from "zod";
import { getUserPosts } from "../db";
import { GetToken, safeParse, sendError } from "../utility";

const home_schema = z.object({
  token: z.string(),
  id: z.number()
});

export const Home = async ({ body, set }) => {
  try {
    const result = await safeParse(home_schema, body);
    await GetToken(result.id, result.token);
  } catch (e: any) {
    set.status = 403;

    return sendError(e.message);
  };

  const galleries = await getUserPosts(body.id);

  const return_json = {
    data: "His galleries",
    galleries: galleries
  };
  return return_json;
};
