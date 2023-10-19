export const safeParse = (schema: any, body: {}) => {
  const result = schema.safeParse(body)

  if (result.success !== true) throw new Error(result.error.issues[0].message);

  return result.data;
};
