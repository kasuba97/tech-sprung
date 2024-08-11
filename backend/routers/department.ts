import { Router } from "express";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
} from "../controllers/department";
const departmentRoutes = Router();

// handles
departmentRoutes.post("/create", createDepartment);
departmentRoutes.get("/get/:id", getDepartmentById);
departmentRoutes.put("/update/:id", updateDepartment);
departmentRoutes.get("/all", getAllDepartments);
departmentRoutes.delete("/delete/:id", deleteDepartment);

export default departmentRoutes;
