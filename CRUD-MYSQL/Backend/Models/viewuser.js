import express from "express";
import dotenv from "dotenv";
import db from "../config/db.js";
dotenv.config();

const router = express.Router();

// Corrected route path
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users");
    res.json({ status: "success", data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "DB Fetch Failed" });
  }
});

export default router;
