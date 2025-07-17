import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import User, { IUser, roles } from "../../models/userModel";
import { env } from "../../config/envConfig";
import { JwtPayload } from "../../types";

interface IRegister {
  name: string;
  email: string;
  password: string;
  role: roles;
  employeeId: string;
  workStatus: "working" | "resigned" | "retired";
  status: "active" | "Inactive" | "Deleted";
  workRole: string;
  departmentId: string;
  managerId: string;
}

export const createUser = async (userPayload: IRegister) => {
  const existing = await User.findOne({ email: userPayload.email });
  if (existing) throw new Error("User already exists");

  const passwordHash = await bcrypt.hash(userPayload.password, 10);
  const user = new User({
    name: userPayload.name,
    email: userPayload.email,
    passwordHash: passwordHash,
    role: userPayload.role,
  });
  const createdUser = await user.save();
  return {
    name: createdUser.name,
    email: createdUser.email,
    role: createdUser.role,
  };
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; role: roles }> => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid credentials");

  // const nurse = await nurseModel.find({userId: user._id})
  // const nurseId = nurse[0]._id
  return {
    token: generateJWT(user),
    role: user.role,
  };
};

const generateJWT = (user: IUser) => {
  const payload: JwtPayload["user"] = {
    userId: user._id as string,
    role: user.role,
  };

  const token = jwt.sign(payload, env.JWT_ACCESS, { expiresIn: "7d" });
  return token;
};

export const getUserById = async (userId: string) => {
  const users = await User.find({ _id: userId }, { passwordHash: 0 });
  return users[0];
};
