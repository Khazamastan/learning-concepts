import React from 'react';

export function OnboardingShell({ data = {} }) {
  return (
    <section className="component onboarding-shell">
      <header>
        <h2>OnboardingShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
