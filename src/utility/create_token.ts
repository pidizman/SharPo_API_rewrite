import secureRandom from "secure-random";
import { create } from "njwt";

export const createToken = (username: string) => {
  const signingKey = secureRandom(256, { type: "Buffer" });
  const token = create(username, signingKey).compact();

  const obj = {
    signingKey: signingKey,
    token: token
  };
  return obj;
};
