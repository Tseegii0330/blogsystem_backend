import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import apiRoutes from "./routes/index.js";

app.use(express.json());
app.use(express.static("static"));

//routes
app.use("/api", apiRoutes);

app.all("/", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
  next();
});
app.use(async function (err, req, res, next) {
  console.log("Middleware Error Handling", err);
  if (err.statusCode) {
    res.status(err.statusCode).json({
      success: false,
      status: err.statusCode ?? 500,
      message: err.message ?? "unknown error",
    });
  } else {
    console.log(err);
    res.status(err.status ?? 500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
