import express, { Router } from "express";
import morgan from "morgan";
import userRouter from "./routers/user";

const PORT = 3001; // since next is running on port 3000

const app = express();
const router = Router();

// Configure Morgan to log requests in 'combined' format
// still in development mode right?😑
app.use(morgan("dev"));

app.get("/", (req, res) => res.status(200).send("server 🚀 touch down!"));
// Use your router middleware
app.get("/user", userRouter);

app.use((req, res, next) => {
  //   res.status(404).json({ message: "Not Found" });
  res.status(404).send("wait who?");
});

// Start the server
app.listen(PORT, () => {
  console.log("server⚡: running on port ", PORT);
});
