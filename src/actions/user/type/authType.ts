import { JwtPayload } from "jsonwebtoken";

export type tokenUserAuth = JwtPayload & {
  id: string;
};
