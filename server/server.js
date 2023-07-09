import path from "path";
import express from "express";
/* eslint-disable-next-line no-unused-vars */
import colors from "colors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

config();

const port = process.env.PORT || 8000;

// MongoDB Connection
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

/**
 * ===========Paypal Payment Integration=================
 */

app.get("/api/config/payment", (req, res) =>
  res.send({
    clientId: process.env.PAYPAL_CLIENT_ID,
  })
);

app.use(notFound);
app.use(errorHandler);

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server running on port: ${port}`));
