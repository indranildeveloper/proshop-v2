import express from "express";
import colors from "colors";
import { config } from "dotenv";
import connectDB from "./config/db";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import productRoutes from "./routes/productRoutes";

config();

const port = process.env.PORT || 8000;

// MongoDB Connection
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port: ${port}`));
