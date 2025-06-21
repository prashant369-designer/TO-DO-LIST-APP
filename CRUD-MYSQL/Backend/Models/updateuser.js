import express from "express";
import dotenv from "dotenv";
import db from "../config/db.js";
dotenv.config();

const router = express.Router();

// Update user by ID
router.put("/:id", async (req, res) => {
  const { name, phone, message } = req.body;
  const { id } = req.params;

  try {
    await db.execute(
      "UPDATE users SET name = ?, phone = ?, message = ? WHERE id = ?",
      [name, phone, message, id]
    );
    res.json({ status: "success", message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "DB Update Failed" });
  }
});

export default router;
