import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { AuthRouter } from "./routes/authRoute.js";
import { UserRouter } from "./routes/userRoute.js";
import { ChatRouter } from "./routes/chatRoute.js";
import { ConnectMongoDB } from "./lib/db.js";

dotenv.config();
const port = process.env.PORT;
const app = express();

const __dirname = path.resolve()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/chat", ChatRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`🚀 Server is running at ${port}`);
  ConnectMongoDB();
});
