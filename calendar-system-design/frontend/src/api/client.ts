import axios from 'axios';
import type { Calendar, CalendarEvent, CalendarMembership, CalendarRole, Invite, InviteStatus, User } from '../types/api.js';

const api = axios.create({
  baseURL: '/api'
});

export const fetchCalendars = async (userId: string) => {
  const { data } = await api.get<Calendar[]>('/calendars', {
    params: { userId }
  });
  return data;
};

export const createCalendar = async (payload: { name: string; description?: string; ownerId: string }) => {
  const { data } = await api.post<Calendar>('/calendars', payload);
  return data;
};

export const updateCalendar = async (calendarId: string, payload: { name?: string; description?: string }) => {
  const { data } = await api.patch<Calendar>(`/calendars/${calendarId}`, payload);
  return data;
};

export const shareCalendar = async (payload: { calendarId: string; userId: string; role: CalendarRole }) => {
  const { data } = await api.post<CalendarMembership>('/calendars/share', payload);
  return data;
};

export const deleteCalendar = async (calendarId: string) => {
  await api.delete(`/calendars/${calendarId}`);
};

export const ensureUser = async (payload: { email: string; name?: string }) => {
  const { data } = await api.post<User>('/users', payload);
  return data;
};

export const listUsers = async () => {
  const { data } = await api.get<User[]>('/users');
  return data;
};

export const fetchEvents = async (calendarId: string, params: { from?: string; to?: string }) => {
  const { data } = await api.get<CalendarEvent[]>('/events', {
    params: { calendarId, ...params }
  });
  return data;
};

export const createEvent = async (payload: Partial<CalendarEvent> & { calendarId: string; organizerId: string; start: string; end: string; title: string }) => {
  const { data } = await api.post<CalendarEvent>('/events', payload);
  return data;
};

export const updateEvent = async (eventId: string, payload: Partial<CalendarEvent>) => {
  const { data } = await api.patch<CalendarEvent>(`/events/${eventId}`, payload);
  return data;
};

export const deleteEvent = async (eventId: string) => {
  await api.delete(`/events/${eventId}`);
};

export const fetchInvites = async (email: string) => {
  const { data } = await api.get<Invite[]>('/invites', {
    params: { email }
  });
  return data;
};

export const respondToInvite = async (payload: { inviteId: string; status: InviteStatus }) => {
  const { data } = await api.post<Invite>('/invites/respond', payload);
  return data;
};
