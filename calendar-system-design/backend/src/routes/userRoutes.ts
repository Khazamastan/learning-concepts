import { Router } from 'express';
import { createUserHandler, getUserHandler, listUsersHandler } from '../controllers/userController.js';

export const userRouter = Router();

userRouter.post('/', createUserHandler);
userRouter.get('/', listUsersHandler);
userRouter.get('/:id', getUserHandler);
