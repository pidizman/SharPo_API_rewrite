import {
  ForgottenPassword,
  Login,
  Register,
  CreateGallery,
  Home
} from "./api";

type Route = {
  method: "get" | "post"
  name: string
  handler: (body, set) => {};
}

export const Routes: Route[] = [
  {
    method: "post",
    name: "/login",
    handler: Login
  },
  {
    method: "post",
    name: "/register",
    handler: Register
  },
  {
    method: "post",
    name: "/forgottenPassword",
    handler: ForgottenPassword
  },
  {
    method: "post",
    name: "/createGallery",
    handler: CreateGallery
  },
  {
    method: "post",
    name: "/home",
    handler: Home
  }
];
