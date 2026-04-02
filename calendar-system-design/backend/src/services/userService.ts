import { prisma } from '../lib/prisma.js';
import type { UserCreateInput } from '../utils/validation.js';

export const createUser = async (input: UserCreateInput) => {
  return await prisma.user.create({
    data: {
      email: input.email,
      name: input.name
    }
  });
};

export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({ where: { id: userId } });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const listUsers = async () => {
  return await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
};
