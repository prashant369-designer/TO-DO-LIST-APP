import express from "express";
import dotenv from "dotenv";
import db from "../config/db.js";
dotenv.config();

const router = express.Router();

// DELETE user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM users WHERE id = ?", [id]);
    res.json({ status: "success", message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "DB Delete Failed" });
  }
});

export default router;
