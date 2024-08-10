import prisma from "@/utils/prisma";
import { Request, Response } from "express";

export const signUpemployee = async (req: Request, res: Response) => {
  const { username, email, password, role, department } = req.body;
  await prisma.employee.create({
    data: {
      username: username,
      email: email,
      role: role,
      department: department,
      password: password,
    },
  });
};
