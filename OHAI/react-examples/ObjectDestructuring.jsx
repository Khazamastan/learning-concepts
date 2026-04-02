'use client';

import React, { useMemo } from 'react';

const user = {
  id: 101,
  name: 'Ada Lovelace',
  contact: {
    email: 'ada@example.com',
    phone: '+1-202-555-0101',
  },
  roles: ['admin', 'editor', 'viewer'],
};

export function ObjectDestructuringDemo() {
  const { id, displayName, email, phoneNumber, primaryRole, otherRoles } = useMemo(() => {
    const {
      id: userId,
      name: displayName,
      contact: { email, phone: phoneNumber },
      roles: [primaryRole, ...otherRoles],
    } = user;
    return { id: userId, displayName, email, phoneNumber, primaryRole, otherRoles };
  }, []);

  return (
    <section>
      <h2>Object Destructuring</h2>
      <dl>
        <dt>Id</dt>
        <dd>{id}</dd>
        <dt>Display Name</dt>
        <dd>{displayName}</dd>
        <dt>Email</dt>
        <dd>{email}</dd>
        <dt>Phone Number</dt>
        <dd>{phoneNumber}</dd>
        <dt>Primary Role</dt>
        <dd>{primaryRole}</dd>
        <dt>Other Roles</dt>
        <dd>{otherRoles.join(', ')}</dd>
      </dl>
    </section>
  );
}
