import mongoose, {Types, Document } from "mongoose";

export type roles = "admin" | "staff" | "manager"| "nurse"
export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: roles;
}

const userSchema = new mongoose.Schema(
  {
    employeeId:{ type: String, trim: true, required: false },
    name: { type: String, trim: true, required: true },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["staff", "manager", "admin", "nurse"] },
    workStatus:{ type: String, enum: ["working" , "resigned" , "retired"] },
    status:{ type: String, enum: ["active" , "Inactive" , "Deleted"] },
    workRole:{ type:Types.ObjectId, ref: "Role", required: false },
    departmentId:{ type:Types.ObjectId, ref: "Department", required: false },
    managerId:{ type:Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
