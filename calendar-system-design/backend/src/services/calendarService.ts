import { prisma } from '../lib/prisma.js';
import type { CalendarCreateInput, CalendarShareInput } from '../utils/validation.js';

export const createCalendar = async (input: CalendarCreateInput) => {
  return await prisma.calendar.create({
    data: {
      name: input.name,
      description: input.description,
      ownerId: input.ownerId,
      memberships: {
        create: {
          userId: input.ownerId,
          role: 'OWNER'
        }
      }
    },
    include: {
      memberships: true
    }
  });
};

export const shareCalendar = async (input: CalendarShareInput) => {
  return await prisma.calendarMembership.upsert({
    where: {
      calendarId_userId: {
        calendarId: input.calendarId,
        userId: input.userId
      }
    },
    update: {
      role: input.role
    },
    create: {
      calendarId: input.calendarId,
      userId: input.userId,
      role: input.role
    },
    include: {
      user: true
    }
  });
};

export const listCalendarsForUser = async (userId: string) => {
  return await prisma.calendar.findMany({
    where: {
      OR: [
        { ownerId: userId },
        {
          memberships: {
            some: {
              userId
            }
          }
        }
      ]
    },
    include: {
      owner: true,
      memberships: {
        include: {
          user: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  });
};

export const getCalendarById = async (calendarId: string) => {
  return await prisma.calendar.findUnique({
    where: { id: calendarId },
    include: {
      owner: true,
      memberships: {
        include: {
          user: true
        }
      }
    }
  });
};

export const updateCalendar = async (calendarId: string, data: Partial<Pick<CalendarCreateInput, 'name' | 'description'>>) => {
  return await prisma.calendar.update({
    where: { id: calendarId },
    data,
    include: {
      owner: true,
      memberships: true
    }
  });
};

export const deleteCalendar = async (calendarId: string) => {
  await prisma.calendar.delete({ where: { id: calendarId } });
};
