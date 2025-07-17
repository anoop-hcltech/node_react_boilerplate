import { roles } from "../models/userModel";
export interface CustomRequest extends Request, JwtPayload {}

export interface JwtPayload {
  user: {
    userId: string;
    role: roles;
  };
}
