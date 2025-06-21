import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import viewuser from "./Models/viewuser.js";
import createuser from "./Models/createuser.js";
import deleteuser from "./Models/deleteuser.js";
import updateuser from "./Models/updateuser.js";

dotenv.config(); // moved up
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Use base paths only
app.use("/viewuser", viewuser);
app.use("/createuser", createuser);
app.use("/deleteuser", deleteuser);
app.use("/updateuser", updateuser);

// Start server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
