import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './components/AppLayout.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { CalendarPage } from './pages/CalendarPage.js';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'calendars/:calendarId',
        element: <CalendarPage />
      }
    ]
  }
]);
