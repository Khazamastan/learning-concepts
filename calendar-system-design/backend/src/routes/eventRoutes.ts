import { Router } from 'express';
import { createEventHandler, deleteEventHandler, getEventHandler, listEventsHandler, updateEventHandler } from '../controllers/eventController.js';

export const eventRouter = Router();

eventRouter.post('/', createEventHandler);
eventRouter.get('/', listEventsHandler);
eventRouter.get('/:id', getEventHandler);
eventRouter.patch('/:id', updateEventHandler);
eventRouter.delete('/:id', deleteEventHandler);
