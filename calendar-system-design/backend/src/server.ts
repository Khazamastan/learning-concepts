import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { calendarRouter } from './routes/calendarRoutes.js';
import { eventRouter } from './routes/eventRoutes.js';
import { inviteRouter } from './routes/inviteRoutes.js';
import { userRouter } from './routes/userRoutes.js';

const PORT = Number(process.env.PORT ?? 4000);

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/users', userRouter);
app.use('/api/calendars', calendarRouter);
app.use('/api/events', eventRouter);
app.use('/api/invites', inviteRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  // Basic error normalisation
  if (err instanceof Error) {
    res.status(500).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: 'Unknown error occurred' });
});

app.listen(PORT, () => {
  console.log(`Calendar API listening on port ${PORT}`);
});
