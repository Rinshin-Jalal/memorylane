import mongoose from "mongoose";

mongoose.models = {};
mongoose.modelSchemas = {};

const memorySchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    privacy: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Memory", memorySchema);
