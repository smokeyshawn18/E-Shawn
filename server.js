import express from "express";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

dotenv.config();

// db connection
connectDB();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://e-shawn.vercel.app"], // Allow frontend domains
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // If using cookies or authentication
  })
);

// rest apis
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgBlue.white);
});
