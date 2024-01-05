import { describe, expect, test } from "bun:test";
import { Response } from "./types";

describe("login", () => {
  test("all_correct", async () => {
    const response = await fetch("http://localhost:9090/login", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "testovaci_panak",
        password: "qyfdAv-1qaqbu-catsyc",
      }),
    });

    const data = (await response.json<Response>()).data;

    expect(data).toEqual("Logined");
  });

  test("wrong_name", async () => {
    const response = await fetch("http://localhost:9090/login", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Name",
        password: "12345678",
      }),
    });

    const data = (await response.json<Response>()).message;

    expect(data).toEqual("User with this username doesn't exist");
  });

  test("wrong_password", async () => {
    const response = await fetch("http://localhost:9090/login", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "testovaci_panak",
        password: "123456789",
      }),
    });

    const data = (await response.json<Response>()).message;

    expect(data).toEqual("Wrong password");
  });

  test("password_less_than_8_characters", async () => {
    const response = await fetch("http://localhost:9090/login", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "testovaci_panak",
        password: "1234567",
      }),
    });

    const data = (await response.json<Response>()).message;

    expect(data).toEqual("Password must have more than 8 characters");
  });
});
