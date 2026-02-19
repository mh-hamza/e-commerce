import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import userAuthRoutes from "./routes/authRoutes.js";

dotenv.config();


connectDB();

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/admin", adminRoutes);
app.use("/api/user", userAuthRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});