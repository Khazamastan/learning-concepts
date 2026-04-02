import { z } from 'zod';

export const userCreateSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(120).optional()
});

export const calendarCreateSchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(500).optional(),
  ownerId: z.string().cuid()
});

export const calendarShareSchema = z.object({
  calendarId: z.string().cuid(),
  userId: z.string().cuid(),
  role: z.enum(['OWNER', 'EDITOR', 'VIEWER']).default('VIEWER')
});

export const eventCreateSchema = z.object({
  calendarId: z.string().cuid(),
  organizerId: z.string().cuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  location: z.string().max(255).optional(),
  start: z.string().datetime(),
  end: z.string().datetime(),
  isAllDay: z.boolean().default(false),
  recurrenceRule: z.string().optional(),
  recurrenceEnd: z.string().datetime().optional(),
  recurrenceTimezone: z.string().optional(),
  attendees: z.array(z.object({
    userId: z.string().cuid(),
    status: z.enum(['PENDING', 'ACCEPTED', 'DECLINED']).default('PENDING')
  })).optional(),
  invites: z.array(z.object({
    email: z.string().email()
  })).optional()
});

export const eventUpdateSchema = eventCreateSchema.partial().extend({
  id: z.string().cuid()
});

export const inviteRespondSchema = z.object({
  inviteId: z.string().cuid(),
  status: z.enum(['ACCEPTED', 'DECLINED', 'TENTATIVE'])
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type CalendarCreateInput = z.infer<typeof calendarCreateSchema>;
export type CalendarShareInput = z.infer<typeof calendarShareSchema>;
export type EventCreateInput = z.infer<typeof eventCreateSchema>;
export type EventUpdateInput = z.infer<typeof eventUpdateSchema>;
export type InviteRespondInput = z.infer<typeof inviteRespondSchema>;
