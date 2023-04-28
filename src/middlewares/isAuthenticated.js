import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import dotenv from "dotenv";
dotenv.config();
import { connect } from "@/utils/db";

const isAuthenticated = (handler) => async (req, res) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      await connect();

      req.user = await userModel
        .findById(decoded.id)
        .select("-password")
        .lean();

      handler(req, res);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
  if (token === "") {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default isAuthenticated;
