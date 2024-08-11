import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const prisma = new PrismaClient({
  errorFormat: "pretty",
});

const hashSalt = parseInt(process.env.HASH_KEY || "10");

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, hashSalt);
};

export const assignLoginToken = async (password: string) => {};
