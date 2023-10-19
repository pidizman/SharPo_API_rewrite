export const sendError = (message: string) => {
  const return_json = {
    data: null,
    message: message
  };

  return return_json;
};
