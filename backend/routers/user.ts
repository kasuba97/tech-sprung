import { Router } from "express";
import {
  getAllUsers,
  signInEmployee,
  signUpemployee,
} from "../controllers/employee";
const userRoutes = Router();

// handles
userRoutes.get("/all", getAllUsers);
userRoutes.post("/signup", signUpemployee);
userRoutes.post("/signin", signInEmployee);

export default userRoutes;
