import express from "express";
import dotenv from "dotenv";
import db from "../config/db.js";
dotenv.config();

const router = express.Router();

//create a user
router.post("/", async (req, res) => {
  const { name, phone, message } = req.body;
  try {
    await db.execute(
      "INSERT INTO users (name, phone, message) VALUES (?, ?, ?)",
      [name, phone, message]
    );
    res.json({ status: "success", message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "DB Insert Failed" });
  }
});

export default router;