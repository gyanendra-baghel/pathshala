import { JWTUser } from "./types";

declare module "express-serve-static-core" {
  interface Request {
    user?: JWTUser;
  }
}
