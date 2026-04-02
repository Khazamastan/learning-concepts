import type { Request, Response } from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { eventCreateSchema, eventUpdateSchema } from '../utils/validation.js';
import { createEvent, deleteEvent, getEventById, listEventsForCalendar, updateEvent } from '../services/eventService.js';

export const createEventHandler = asyncHandler(async (req: Request, res: Response) => {
  const payload = eventCreateSchema.parse(req.body);
  const event = await createEvent(payload);
  res.status(201).json(event);
});

export const updateEventHandler = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = eventUpdateSchema.parse({ ...req.body, id });
  const event = await updateEvent(id, payload);
  res.json(event);
});

export const listEventsHandler = asyncHandler(async (req: Request, res: Response) => {
  const calendarId = req.query.calendarId as string | undefined;
  if (!calendarId) {
    res.status(400).json({ message: 'calendarId query param is required' });
    return;
  }
  const events = await listEventsForCalendar(calendarId, {
    from: req.query.from as string | undefined,
    to: req.query.to as string | undefined
  });
  res.json(events);
});

export const getEventHandler = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const event = await getEventById(id);
  if (!event) {
    res.status(404).json({ message: 'Event not found' });
    return;
  }
  res.json(event);
});

export const deleteEventHandler = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteEvent(id);
  res.status(204).send();
});
