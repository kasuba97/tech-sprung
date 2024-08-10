import prisma from "@/utils/prisma";
import { Request, Response, Router } from "express";
const userRouter = Router();

// handles
userRouter.post("/signup");

// export default signUpemployee;
export default userRouter;
