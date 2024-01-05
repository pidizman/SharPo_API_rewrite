import { afterAll, describe, expect, test } from "bun:test";
import { Response } from "./types";
import { db } from "../src/db";
import { users } from "../src/schema.db";
import { eq } from "drizzle-orm";

var number: number;

function getRandomInt() {
  return Math.floor(Math.random() * 100);
}

describe("register", () => {
  test("all_correct", async () => {
    number = getRandomInt();

    const response = await fetch("http://localhost:9090/register", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `debil_${number}@mail.com`,
        username: `debil_${number}`,
        password: "12345678",
      }),
    });

    const data = (await response.json<Response>()).data;

    expect(data).toEqual("Registred");
  });

  test("email_is_in_use", async () => {
    const response = await fetch("http://localhost:9090/register", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "panak@gmail.cz",
        username: "debil",
        password: "12345678",
      }),
    });

    const data = (await response.json<Response>()).message;

    expect(data).toEqual("This email is already registred");
  });

  test("username_is_in_use", async () => {
    const response = await fetch("http://localhost:9090/register", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `debil_${getRandomInt()}@gmail.cz`,
        username: "testovaci_panak",
        password: "12345678",
      }),
    });

    const data = (await response.json<Response>()).message;

    expect(data).toEqual("Username is already used");
  });

  test("password_less_than_8_characters", async () => {
    const response = await fetch("http://localhost:9090/register", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `debil_${getRandomInt()}@gmail.cz`,
        username: `debil_${getRandomInt()}`,
        password: "1234567",
      }),
    });

    const data = (await response.json<Response>()).message;

    expect(data).toEqual("Password must have more than 8 characters");
  });
});

afterAll(async () => {
  await db.delete(users).where(eq(users.username, `debil_${number}`));
});
