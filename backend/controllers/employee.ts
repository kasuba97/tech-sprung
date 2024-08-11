import { hashPassword, prisma } from "../utils/prisma";
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
 * Close Plan-b employee account
 * @param req username,email,password,role,department
 * @param res code status ``201`` or ``error``
 */
export const closeEmployeeAccount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!id || !password)
    return res.status(403).send("Error: Invalid user password");

  try {
    // const user = await prisma.employee.findFirst({
    //   where: {
    //     id: parseInt(id),
    //   },
    // });

    const user = await prisma.employee.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(201).send("User deleted successfully");
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
export const signUpemployee = async (req: Request, res: Response) => {
  const { username, email, password, role, departmentId } = req.body;

  if (!email || !password || !username || !departmentId) {
    return res.status(400).json({
      error: "Email, password, name, and department ID are required.",
    });
  }

  const parseDepartmentId = parseInt(departmentId);

  const passwordHash = await hashPassword(password);

  try {
    const response = await prisma.employee.create({
      data: {
        username: username,
        email: email,
        role: role,
        password: passwordHash,
        department: {
          connect: {
            id: parseDepartmentId,
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
    console.log("Error: ", err);

    return res.status(500).send(err);
  }
};

/**
 * Login a Plan-b employee
 * @param req username,email,password,role,department
 * @param res user details ``type Object``
 */
export const signInEmployee = async (req: Request, res: Response) => {
  const { EmailOrUsername, password } = req.body;

  if (!password && !EmailOrUsername) {
    return res.status(400).json({
      error: "Email or username, or password is incorrect",
    });
  }

  try {
    const user = await prisma.employee.findFirst({
      where: {
        OR: [{ email: EmailOrUsername }, { username: EmailOrUsername }],
      },
    });

    if (!user) return "this user does not have an account";

    return res.status(201).send(user);
  } catch (err: any) {
    if (err.code == "P2002") {
      res.status(500).send(`Error: user with this email/username exists`);
      return;
    }
    return res.status(500).send(err);
  }
};
