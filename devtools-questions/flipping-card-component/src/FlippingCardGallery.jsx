import * as React from "react";
import { FlippingCard } from "./FlippingCard.jsx";

const CARDS = [
  {
    id: "react",
    icon: "⚛️",
    title: "React",
    description: "Component-based UI library that powers dynamic experiences.",
    details: ["Declarative rendering", "Virtual DOM diffing", "Hooks API"],
  },
  {
    id: "typescript",
    icon: "📘",
    title: "TypeScript",
    description: "Adds optional types to JavaScript for better tooling and safety.",
    details: ["Structural typing", "Type inference", "Gradual adoption"],
  },
  {
    id: "testing",
    icon: "🧪",
    title: "Testing Library",
    description: "Lightweight DOM testing utilities focusing on user behavior.",
    details: ["Queries mimic user interactions", "Accessible-first testing", "Great DX"],
  },
];

export function FlippingCardGallery() {
  return (
    <main className="gallery">
      <header>
        <h1>Flipping Card Component</h1>
        <p>
          Cards rely on CSS 3D transforms. They remain keyboard accessible and can be
          controlled or uncontrolled. Click or press Enter/Space to flip.
        </p>
      </header>
      <section className="card-grid">
        {CARDS.map((card) => (
          <FlippingCard
            key={card.id}
            front={
              <FlippingCard.Front
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            }
            back={<FlippingCard.Back title="Highlights" bullets={card.details} />}
          />
        ))}
      </section>
    </main>
  );
}
