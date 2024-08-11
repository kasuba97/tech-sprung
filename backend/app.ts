import express, { Request } from "express";
import morgan from "morgan";
import userRoutes from "./routers/user";
import bodyParser from "body-parser";
import departmentRoutes from "./routers/department";
import cors from "cors";

const PORT = 3001; // since next is running on port 3000

const app = express();

// still in development mode right?😑
app.use(morgan("dev"));

app.use(bodyParser.json());

morgan.token("body", (req: Request) => JSON.stringify(req.body));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// falcon 9 touch down
app.get("/", (req, res) => res.status(200).send("server 🚀 touch down!"));

// routers
app.use("/user", userRoutes);
app.use("department", departmentRoutes);

// 404
app.use((req, res, next) => {
  res.status(404).send("wait who?");
});

// Start the server
app.listen(PORT, () => {
  console.log("server⚡: running on port ", PORT);
});
