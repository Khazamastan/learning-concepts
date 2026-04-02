'use client';

import React, { useMemo, useState } from 'react';

function shallowCopy(source) {
  if (source === null || typeof source !== 'object') {
    return source;
  }
  return Array.isArray(source) ? [...source] : { ...source };
}

function deepCopy(source, seen = new WeakMap()) {
  if (source === null || typeof source !== 'object') {
    return source;
  }
  if (seen.has(source)) {
    return seen.get(source);
  }
  const clone = Array.isArray(source) ? [] : {};
  seen.set(source, clone);
  Object.keys(source).forEach((key) => {
    clone[key] = deepCopy(source[key], seen);
  });
  return clone;
}

const seed = {
  id: 1,
  profile: { name: 'Ada Lovelace', projects: ['Analytical Engine'] },
};

export function CopyTechniquesDemo() {
  const [state, setState] = useState(seed);

  const shallow = useMemo(() => shallowCopy(state), [state]);
  const deep = useMemo(() => deepCopy(state), [state]);

  const mutateNested = () => {
    setState((current) => ({
      ...current,
      profile: {
        ...current.profile,
        projects: [...current.profile.projects, `Project ${current.profile.projects.length + 1}`],
      },
    }));
  };

  return (
    <section>
      <h2>Shallow vs Deep Copy</h2>
      <button type="button" onClick={mutateNested}>
        Add Nested Project
      </button>
      <article>
        <h3>Original State</h3>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </article>
      <article>
        <h3>Shallow Copy Snapshot</h3>
        <pre>{JSON.stringify(shallow, null, 2)}</pre>
      </article>
      <article>
        <h3>Deep Copy Snapshot</h3>
        <pre>{JSON.stringify(deep, null, 2)}</pre>
      </article>
      <p>The shallow copy mutates alongside nested changes, while the deep copy remains stable.</p>
    </section>
  );
}
