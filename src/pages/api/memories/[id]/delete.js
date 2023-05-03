import { connect } from "@/utils/db";
import isAuthenticated from "@/middlewares/isAuthenticated";
import memoryModel from "@/models/memoryModel";

async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connect();

    const memoryId = req.query.id;

    const deletedMemory = await memoryModel.findByIdAndDelete(memoryId);

    if (!deletedMemory) {
      return res.status(404).json({ message: "Memory not found" });
    }

    return res.status(200).json({ message: "Memory deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export default isAuthenticated(handler, "user");
