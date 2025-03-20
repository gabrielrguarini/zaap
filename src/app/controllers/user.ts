"use server";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcryptjs";

export async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export async function createUser(email: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
    return { email: newUser.email, id: newUser.id };
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
}
