import { describe, test } from "bun:test";

//TODO udelat neco co bude brat data uzivatele (token, id) a da to do body v requestu

describe("home", () => {
  test("all_correct", async () => {
    const response = await fetch("http://localhost:9090/register", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        token: "",
      }),
    });

    const data = (await response.json<Response>()).data;

    expect(data).toEqual("Registred");
  });
});
