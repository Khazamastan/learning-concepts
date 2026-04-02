import { prisma } from '../lib/prisma.js';
import type { InviteRespondInput } from '../utils/validation.js';

export const listInvitesForEmail = async (email: string) => {
  return await prisma.invite.findMany({
    where: { email },
    include: {
      event: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const respondToInvite = async (input: InviteRespondInput) => {
  return await prisma.invite.update({
    where: { id: input.inviteId },
    data: {
      status: input.status,
      responseAt: new Date()
    },
    include: {
      event: true
    }
  });
};
