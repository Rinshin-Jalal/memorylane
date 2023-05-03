import { connect } from "@/utils/db";
import isAuthenticated from "@/middlewares/isAuthenticated";
import memoryModel from "@/models/memoryModel";
import upload from "@/middlewares/upload";

async function handler(req, res) {
  try {
    const { body, date, imageUrl } = req.body;

    if (!body || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await connect();

    const memory = await memoryModel.findById(req.query.id);

    if (!memory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    if (req.user.id !== memory.user.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    memory.body = body || memory.body;
    memory.date = date || memory.date;
    memory.imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : imageUrl || memory.imageUrl;

    const updatedMemory = await memory.save();

    return res.status(200).json(updatedMemory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default isAuthenticated(upload.single("image"), handler, "moderator");
