import mongoose from "mongoose";

mongoose.models = {};
mongoose.modelSchemas = {};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

export const userProgessModel = mongoose.model(
  "UserProgress",
  userProgressSchema
);

export default mongoose.model("User", userSchema);
