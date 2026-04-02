import type { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { calendarCreateSchema, calendarShareSchema } from '../utils/validation.js';
import { createCalendar, deleteCalendar, getCalendarById, listCalendarsForUser, shareCalendar, updateCalendar } from '../services/calendarService.js';

export const createCalendarHandler = asyncHandler(async (req: Request, res: Response) => {
  const payload = calendarCreateSchema.parse(req.body);
  const calendar = await createCalendar(payload);
  res.status(201).json(calendar);
});

export const listCalendarsHandler = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.query.userId as string | undefined;
  if (!userId) {
    res.status(400).json({ message: 'userId query param is required' });
    return;
  }
  const calendars = await listCalendarsForUser(userId);
  res.json(calendars);
});

export const getCalendarHandler = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const calendar = await getCalendarById(id);
  if (!calendar) {
    res.status(404).json({ message: 'Calendar not found' });
    return;
  }
  res.json(calendar);
});

export const shareCalendarHandler = asyncHandler(async (req: Request, res: Response) => {
  const payload = calendarShareSchema.parse(req.body);
  const membership = await shareCalendar(payload);
  res.status(200).json(membership);
});

export const updateCalendarHandler = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = calendarCreateSchema.pick({ name: true, description: true }).partial().parse(req.body);
  const updated = await updateCalendar(id, payload);
  res.json(updated);
});

export const deleteCalendarHandler = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteCalendar(id);
  res.status(204).send();
});
