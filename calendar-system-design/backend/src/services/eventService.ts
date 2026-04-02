import { DateTime } from 'luxon';
import { rrulestr, RRule, RRuleSet } from 'rrule';

import { prisma } from '../lib/prisma.js';
import type { EventCreateInput, EventUpdateInput } from '../utils/validation.js';

const DEFAULT_RECURRING_LOOKAHEAD_MONTHS = 12;
const MAX_EXPANDED_OCCURRENCES = 500;

type EventLike = {
  id: string;
  calendarId: string;
  start: Date;
  end: Date;
  recurrenceRule: string | null;
  recurrenceEnd: Date | null;
  recurrenceTimezone: string | null;
};

type EventCreateLike = Omit<EventLike, 'id'> & { id?: string };

type Occurrence = {
  eventId: string;
  start: DateTime;
  end: DateTime;
};

const toDateTime = (value: Date | string, zone?: string | null) => {
  if (value instanceof Date) {
    return DateTime.fromJSDate(value, { zone: zone ?? undefined }).toUTC();
  }
  return DateTime.fromISO(value, { zone: zone ?? undefined }).toUTC();
};

const buildWindow = (event: EventCreateLike) => {
  const start = toDateTime(event.start, event.recurrenceTimezone);
  const eventEnd = toDateTime(event.end, event.recurrenceTimezone);

  if (eventEnd <= start) {
    throw new Error('Event end time must be after start time');
  }

  const windowStart = start.minus({ days: 1 });
  const windowEnd = event.recurrenceRule
    ? (event.recurrenceEnd
      ? toDateTime(event.recurrenceEnd, event.recurrenceTimezone)
      : start.plus({ months: DEFAULT_RECURRING_LOOKAHEAD_MONTHS }))
    : eventEnd.plus({ days: 1 });

  return { windowStart, windowEnd, start, end: eventEnd };
};

const expandOccurrences = (event: EventLike, windowStart: DateTime, windowEnd: DateTime): Occurrence[] => {
  const zone = event.recurrenceTimezone ?? undefined;
  const eventStart = DateTime.fromJSDate(event.start, { zone }).toUTC();
  const eventEnd = DateTime.fromJSDate(event.end, { zone }).toUTC();
  const duration = eventEnd.diff(eventStart, ['milliseconds']).milliseconds;

  if (!event.recurrenceRule) {
    if (eventEnd <= windowStart || eventStart >= windowEnd) {
      return [];
    }

    return [{
      eventId: event.id,
      start: eventStart,
      end: eventEnd
    }];
  }

  const rule = rrulestr(event.recurrenceRule, {
    dtstart: DateTime.fromJSDate(event.start, { zone }).toJSDate()
  }) as RRule | RRuleSet;

  const occurrences = rule.between(windowStart.toJSDate(), windowEnd.toJSDate(), true);
  const limited = occurrences.slice(0, MAX_EXPANDED_OCCURRENCES);

  return limited.map((occurrenceStart) => {
    const occurrence = DateTime.fromJSDate(occurrenceStart, { zone }).toUTC();
    const occurrenceEnd = occurrence.plus({ milliseconds: duration });

    if (event.recurrenceEnd) {
      const until = DateTime.fromJSDate(event.recurrenceEnd, { zone }).toUTC();
      if (occurrence > until) {
        return null;
      }
    }

    return {
      eventId: event.id,
      start: occurrence,
      end: occurrenceEnd
    } satisfies Occurrence | null;
  }).filter((occurrence): occurrence is Occurrence => occurrence !== null);
};

const rangesOverlap = (a: Occurrence, b: Occurrence) => {
  return a.start < b.end && b.start < a.end;
};

const assertNoOverlap = async (event: EventCreateLike, excludedEventId?: string) => {
  const { windowStart, windowEnd } = buildWindow(event);

  const candidates = await prisma.event.findMany({
    where: {
      calendarId: event.calendarId,
      id: excludedEventId ? { not: excludedEventId } : undefined,
      OR: [
        {
          start: {
            lt: windowEnd.toJSDate()
          },
          end: {
            gt: windowStart.toJSDate()
          }
        },
        {
          recurrenceRule: {
            not: null
          }
        }
      ]
    },
    select: {
      id: true,
      calendarId: true,
      start: true,
      end: true,
      recurrenceRule: true,
      recurrenceEnd: true,
      recurrenceTimezone: true
    }
  });

  const newOccurrences = expandOccurrences({
    id: event.id ?? 'new-event',
    calendarId: event.calendarId,
    start: event.start instanceof Date ? event.start : new Date(event.start),
    end: event.end instanceof Date ? event.end : new Date(event.end),
    recurrenceRule: event.recurrenceRule ?? null,
    recurrenceEnd: event.recurrenceEnd instanceof Date ? event.recurrenceEnd : (event.recurrenceEnd ? new Date(event.recurrenceEnd) : null),
    recurrenceTimezone: event.recurrenceTimezone ?? null
  }, windowStart, windowEnd);

  for (const candidate of candidates) {
    const occurrences = expandOccurrences(candidate, windowStart, windowEnd);
    for (const newOccurrence of newOccurrences) {
      if (occurrences.some((occ) => rangesOverlap(occ, newOccurrence))) {
        throw new Error('Event overlaps with an existing event in this calendar');
      }
    }
  }
};

export const createEvent = async (input: EventCreateInput) => {
  const eventStart = toDateTime(input.start, input.recurrenceTimezone).toJSDate();
  const eventEnd = toDateTime(input.end, input.recurrenceTimezone).toJSDate();

  await assertNoOverlap({
    calendarId: input.calendarId,
    start: eventStart,
    end: eventEnd,
    recurrenceRule: input.recurrenceRule ?? null,
    recurrenceEnd: input.recurrenceEnd ? toDateTime(input.recurrenceEnd, input.recurrenceTimezone).toJSDate() : null,
    recurrenceTimezone: input.recurrenceTimezone ?? null,
    id: undefined
  });

  return await prisma.event.create({
    data: {
      calendarId: input.calendarId,
      organizerId: input.organizerId,
      title: input.title,
      description: input.description,
      location: input.location,
      start: eventStart,
      end: eventEnd,
      isAllDay: input.isAllDay ?? false,
      recurrenceRule: input.recurrenceRule ?? null,
      recurrenceEnd: input.recurrenceEnd ? toDateTime(input.recurrenceEnd, input.recurrenceTimezone).toJSDate() : null,
      recurrenceTimezone: input.recurrenceTimezone ?? null,
      attendees: input.attendees
        ? {
          createMany: {
            data: input.attendees.map((attendee) => ({
              userId: attendee.userId,
              status: attendee.status
            }))
          }
        }
        : undefined,
      invites: input.invites
        ? {
          createMany: {
            data: input.invites.map((invite) => ({
              email: invite.email
            }))
          }
        }
        : undefined
    },
    include: {
      attendees: true,
      invites: true
    }
  });
};

export const updateEvent = async (eventId: string, input: EventUpdateInput) => {
  const existing = await prisma.event.findUniqueOrThrow({
    where: { id: eventId },
    include: {
      attendees: true,
      invites: true
    }
  });

  const merged: EventCreateLike = {
    id: existing.id,
    calendarId: existing.calendarId,
    start: input.start ? toDateTime(input.start, input.recurrenceTimezone ?? existing.recurrenceTimezone).toJSDate() : existing.start,
    end: input.end ? toDateTime(input.end, input.recurrenceTimezone ?? existing.recurrenceTimezone).toJSDate() : existing.end,
    recurrenceRule: input.recurrenceRule ?? existing.recurrenceRule,
    recurrenceEnd: input.recurrenceEnd ? toDateTime(input.recurrenceEnd, input.recurrenceTimezone ?? existing.recurrenceTimezone).toJSDate() : existing.recurrenceEnd,
    recurrenceTimezone: input.recurrenceTimezone ?? existing.recurrenceTimezone
  };

  await assertNoOverlap(merged, eventId);

  return await prisma.event.update({
    where: { id: eventId },
    data: {
      title: input.title ?? existing.title,
      description: input.description ?? existing.description,
      location: input.location ?? existing.location,
      start: merged.start,
      end: merged.end,
      isAllDay: input.isAllDay ?? existing.isAllDay,
      recurrenceRule: merged.recurrenceRule,
      recurrenceEnd: merged.recurrenceEnd,
      recurrenceTimezone: merged.recurrenceTimezone,
      attendees: input.attendees
        ? {
          deleteMany: {},
          createMany: {
            data: input.attendees.map((attendee) => ({
              userId: attendee.userId,
              status: attendee.status
            }))
          }
        }
        : undefined,
      invites: input.invites
        ? {
          deleteMany: {},
          createMany: {
            data: input.invites.map((invite) => ({
              email: invite.email
            }))
          }
        }
        : undefined
    },
    include: {
      attendees: true,
      invites: true
    }
  });
};

export const listEventsForCalendar = async (calendarId: string, { from, to }: { from?: string; to?: string }) => {
  return await prisma.event.findMany({
    where: {
      calendarId,
      ...(from && {
        end: {
          gte: new Date(from)
        }
      }),
      ...(to && {
        start: {
          lte: new Date(to)
        }
      })
    },
    include: {
      attendees: true,
      invites: true
    },
    orderBy: {
      start: 'asc'
    }
  });
};

export const getEventById = async (eventId: string) => {
  return await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      attendees: true,
      invites: true
    }
  });
};

export const deleteEvent = async (eventId: string) => {
  await prisma.event.delete({ where: { id: eventId } });
};
