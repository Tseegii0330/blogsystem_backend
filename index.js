import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import apiRoutes from "./routes/index.js";

app.use(express.json());
app.use("/api", apiRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
