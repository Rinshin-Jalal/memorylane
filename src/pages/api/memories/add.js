import { connect } from "@/utils/db";
import isAuthenticated from "@/middlewares/isAuthenticated";
import memoryModel from "../../../models/memoryModel";
import upload from "@/middlewares/upload";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connect();

    const { body, date, imageUrl } = req.body;

    if (!title || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let image = "";
    if (req.file) {
      image = "/uploads/" + req.file.filename;
    }

    const memory = new memoryModel({
      body,
      date,
      imageUrl: image || imageUrl || "",
      user: req.user.id,
    });

    const newMemory = await memory.save();

    return res.status(201).json(newMemory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export default isAuthenticated(upload.single("image"), handler, "user");
