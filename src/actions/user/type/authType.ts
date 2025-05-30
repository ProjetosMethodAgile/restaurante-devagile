import { JwtPayload } from "jsonwebtoken";

export type tokenUserAuth = JwtPayload & {
  id: string;
  first_acces: string;
  empresas: string[];
};
