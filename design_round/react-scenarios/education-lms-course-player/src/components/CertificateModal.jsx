import React from 'react';

export function CertificateModal({ data = {} }) {
  return (
    <section className="component certificate-modal">
      <header>
        <h2>CertificateModal</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
