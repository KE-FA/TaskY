import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route";
import taskRoutes from "./routes/tasks.route";
import userRoutes from "./routes/user.route";

const app: Express = express();

app.use(
  cors({
    origin: "localhost:5173",
    credentials: true,
    
    // methods:["POST", "GET", "PUT", "PATCH", "DELETE"]
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("Welcome to the blog App");
});

//Routes
app.use("/api/auth", authRouter);
app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
