import express, { Router } from "express";
import userRoutes from "./routers/user";
const PORT = 3001; // since next is running on port 3000

const app = express();
const router = Router();

router.use("/user", userRoutes);

app.listen(() => console.log("server⚡: running on port ", PORT));
