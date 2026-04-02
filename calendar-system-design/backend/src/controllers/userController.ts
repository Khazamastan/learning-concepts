import type { Request, Response } from 'express';
import { userCreateSchema } from '../utils/validation.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { createUser, getUserById, getUserByEmail, listUsers } from '../services/userService.js';

export const createUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const payload = userCreateSchema.parse(req.body);
  const existing = await getUserByEmail(payload.email);
  if (existing) {
    res.status(200).json(existing);
    return;
  }
  const user = await createUser(payload);
  res.status(201).json(user);
});

export const listUsersHandler = asyncHandler(async (_req: Request, res: Response) => {
  const users = await listUsers();
  res.json(users);
});

export const getUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUserById(id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json(user);
});
