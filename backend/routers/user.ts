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

export default userRoutes;
