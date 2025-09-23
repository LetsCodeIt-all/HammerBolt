import express from "express"; // USE this line only
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../server/routes/auth.js"; // ✅ import routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
