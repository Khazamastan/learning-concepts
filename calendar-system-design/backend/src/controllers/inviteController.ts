import type { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { inviteRespondSchema } from '../utils/validation.js';
import { listInvitesForEmail, respondToInvite } from '../services/inviteService.js';

export const listInvitesHandler = asyncHandler(async (req: Request, res: Response) => {
  const email = req.query.email as string | undefined;
  if (!email) {
    res.status(400).json({ message: 'email query param is required' });
    return;
  }
  const invites = await listInvitesForEmail(email);
  res.json(invites);
});

export const respondToInviteHandler = asyncHandler(async (req: Request, res: Response) => {
  const payload = inviteRespondSchema.parse(req.body);
  const invite = await respondToInvite(payload);
  res.json(invite);
});
