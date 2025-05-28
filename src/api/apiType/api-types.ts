import { JwtPayload } from "jsonwebtoken";

export type TokenData = JwtPayload & {
  id: string;
  empresa: {
    id: string;
    tag: string;
  };
};
