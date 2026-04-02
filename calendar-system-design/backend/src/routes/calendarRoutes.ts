import { Router } from 'express';
import { createCalendarHandler, deleteCalendarHandler, getCalendarHandler, listCalendarsHandler, shareCalendarHandler, updateCalendarHandler } from '../controllers/calendarController.js';

export const calendarRouter = Router();

calendarRouter.post('/', createCalendarHandler);
calendarRouter.get('/', listCalendarsHandler);
calendarRouter.get('/:id', getCalendarHandler);
calendarRouter.post('/share', shareCalendarHandler);
calendarRouter.patch('/:id', updateCalendarHandler);
calendarRouter.delete('/:id', deleteCalendarHandler);
