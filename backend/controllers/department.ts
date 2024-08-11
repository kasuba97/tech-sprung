import { Request, Response, Router } from "express";
import prisma from "../utils/prisma";

/**
 * Creates a new Department
 * @param req ``id``, ``name``, ``employees``, ``services`` from ``body``
 * @param res ``201`` status if successful ``500`` otherwise
 * @returns department object ``{id, name}``
 */
export const createDepartment = async (req: Request, res: Response) => {
  const { name } = req.body;

  // check if department exists

  try {
    const response = await prisma.department.create({
      data: {
        name: name,
      },
    });

    return res.status(201).send(response);
  } catch (err: any) {
    err.code && res.status(500).send("Error: department already exists");
    return res.status(500).send(err);
  }
};

/**
 * Fetches all Department information from the database
 *
 * @param res ``department details``
 *
 */
export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const response = await prisma.department.findMany();

    return res.status(201).send(response);
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * Fetches Department information from the database
 * @param req ``department id`` as a parameter
 * @param res ``department details``
 * @returns
 */
export const getDepartmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const departmentID = parseInt(id);

  if (!id) return res.status(400).send("Error: Invalid department ID");

  try {
    const response = await prisma.department.findFirst({
      where: {
        id: departmentID,
      },
    });

    return res.status(201).send(response);
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * Delete Department from the database
 * @param req department ID as a parameter
 * @returns ``201 - Department deleted successfully`` | ``error``
 */
export const deleteDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const departmentID = parseInt(id);

  if (!id) return res.status(400).send("Error: Invalid department ID");

  console.log(departmentID);

  try {
    const response = await prisma.department.delete({
      where: {
        id: departmentID,
      },
    });

    return res.status(201).send("Department deleted successfully");
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * Updates department name
 * @param req ``id`` of the depepartement
 * @param res ``departement`` updated details
 */
export const updateDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name: departmentName } = req.body;
  const departmentID = parseInt(id);

  console.log(
    "Department id: " + departmentID,
    "Department name: " + departmentName
  );

  if (!id) return res.status(400).send("Error: Invalid department ID");

  try {
    const response = await prisma.department.update({
      where: {
        id: departmentID,
      },
      data: {
        name: departmentName,
      },
    });

    return res.status(201).send("Department updated successfully");
  } catch (err) {
    return res.status(500).send(err);
  }
};
