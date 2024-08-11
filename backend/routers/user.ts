import { Router } from "express";
import {
  closeEmployeeAccount,
  getAllUsers,
  signInEmployee,
  signUpemployee,
} from "../controllers/employee";
const userRoutes = Router();

// handles
userRoutes.get("/all", getAllUsers);
userRoutes.delete("/:id", closeEmployeeAccount);
userRoutes.post("/signup", signUpemployee);
userRoutes.post("/signin", signInEmployee);

// 404
userRoutes.use((req, res, next) => {
  res.status(404).send("wait who?");
});

export default userRoutes;
