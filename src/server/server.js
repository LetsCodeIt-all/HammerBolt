import express from "express"; // USE this line only
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/emailandpassword", (req, res) => {
  setTimeout(() => {
    res.json(req.body);
  }, 5000);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
