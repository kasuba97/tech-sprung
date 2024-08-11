import prisma from "../utils/prisma";
import { Request, Response } from "express";

/**
 * Create a new Plan-b employee
 * @param req username,email,password,role,department
 * @param res user details ``type Object``
 */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await prisma.employee.findMany();

    return res.status(201).send(response);
  } catch (err: any) {
    if (err.name == "PrismaClientKnownRequestError") {
      res.status(500).send(`Error: ${err}`);
      return;
    }
    return res.status(500).send(err);
  }
};

/**
 * Create a new Plan-b employee
 * @param req username,email,password,role,department
 * @param res user details ``type Object``
 */
export const signUpemployee = async (
  req: Request,
  res: Response
  // next: NextFunction
) => {
  const { username, email, password, role, departmentId } = req.body;

  if (!email || !password || !username || !departmentId) {
    return res.status(400).json({
      error: "Email, password, name, and department ID are required.",
    });
  }

  try {
    const response = await prisma.employee.create({
      data: {
        username: username,
        email: email,
        role: role,
        password: password,
        department: {
          connect: {
            id: departmentId,
          },
        },
      },
    });

    return res.status(201).send(response);
  } catch (err: any) {
    if (err.code == "P2002") {
      res.status(500).send(`Error: user with this email or username exists`);
      return;
    }
    return res.status(500).send(err);
  }
};

/**
 * Login a Plan-b employee
 * @param req username,email,password,role,department
 * @param res user details ``type Object``
 */
export const signInEmployee = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({
      error: "Email or username, or password is incorrect",
    });
  }

  try {
    const response = await prisma.employee.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    return res.status(201).send(response);
  } catch (err: any) {
    if (err.code == "P2002") {
      res.status(500).send(`Error: user with this email exists`);
      return;
    }
    return res.status(500).send(err);
  }
};
