import { z } from "zod"
import { createNewPost } from "../db";
import type { InsertPost } from "../schema.db"
import { checkPostName, safeParse, sendError } from "../utility";

const gallery_schema = z.object({
  name: z.string().min(1),
  id: z.number()
});

export const CreateGallery = async ({ body, set }) => {
  try {
    const result = await safeParse(gallery_schema, body);
    await checkPostName(result.id, result.name);
  } catch (e: any) {
    /*set.status = 403;
    const return_json = {
      data: null,
      message: e.message
    };

    return return_json;*/

    set.status = 403;
    return sendError(e.message);
  }

  const today: Date = new Date();
  const postData: InsertPost = {
    authorId: body.id,
    name: body.name,
    created: `${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}`
  };

  await createNewPost(postData)

  const return_json = {
    data: "Gallery created"
  };
  return return_json;
};
