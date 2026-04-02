import { Router } from 'express';
import { listInvitesHandler, respondToInviteHandler } from '../controllers/inviteController.js';

export const inviteRouter = Router();

inviteRouter.get('/', listInvitesHandler);
inviteRouter.post('/respond', respondToInviteHandler);
