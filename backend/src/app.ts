import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.route.js";
import { productRouter } from "./routes/product.route.js";
import categoryRouter from "./routes/category.route.js";

const app = express();

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/orders/webhook", express.raw({ type: "application/json" }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/category", categoryRouter);

export default app;
