export interface User {
  id: string;
  email: string;
  name?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type CalendarRole = 'OWNER' | 'EDITOR' | 'VIEWER';

export interface CalendarMembership {
  id: string;
  calendarId: string;
  userId: string;
  role: CalendarRole;
  user?: User;
}

export interface Calendar {
  id: string;
  name: string;
  description?: string | null;
  ownerId: string;
  owner?: User;
  memberships?: CalendarMembership[];
  createdAt: string;
  updatedAt: string;
}

export type AttendanceStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED';

export interface EventAttendee {
  id: string;
  eventId: string;
  userId: string;
  status: AttendanceStatus;
  user?: User;
}

export type InviteStatus = 'PENDING' | 'ACCEPTED' | 'DECLINED' | 'TENTATIVE';

export interface Invite {
  id: string;
  eventId: string;
  email: string;
  status: InviteStatus;
  responseAt?: string | null;
}

export interface CalendarEvent {
  id: string;
  calendarId: string;
  organizerId: string;
  title: string;
  description?: string | null;
  location?: string | null;
  start: string;
  end: string;
  isAllDay: boolean;
  recurrenceRule?: string | null;
  recurrenceEnd?: string | null;
  recurrenceTimezone?: string | null;
  attendees?: EventAttendee[];
  invites?: Invite[];
}

export interface PaginatedEventsResponse {
  events: CalendarEvent[];
}
