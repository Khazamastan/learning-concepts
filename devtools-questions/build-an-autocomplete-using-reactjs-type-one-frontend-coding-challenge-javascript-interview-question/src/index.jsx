import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { Autocomplete } from "./Autocomplete.jsx";

const root = createRoot(document.getElementById("root"));

const cities = [
  "Amsterdam",
  "Athens",
  "Auckland",
  "Austin",
  "Bangkok",
  "Barcelona",
  "Berlin",
  "Bogota",
  "Boston",
  "Buenos Aires",
  "Chicago",
  "Copenhagen",
  "Dubai",
  "Dublin",
  "Edinburgh",
  "Helsinki",
  "Hong Kong",
  "Istanbul",
  "Jakarta",
  "Kuala Lumpur",
  "Lisbon",
  "London",
  "Los Angeles",
  "Madrid",
  "Melbourne",
  "Mexico City",
  "Miami",
  "Montreal",
  "Munich",
  "New Delhi",
  "New York",
  "Osaka",
  "Oslo",
  "Paris",
  "Prague",
  "Reykjavik",
  "Rome",
  "San Francisco",
  "Santiago",
  "Seoul",
  "Shanghai",
  "Singapore",
  "Stockholm",
  "Sydney",
  "Taipei",
  "Tokyo",
  "Toronto",
  "Vancouver",
  "Vienna",
  "Warsaw",
  "Zurich",
];

root.render(
  <React.StrictMode>
    <main className="app-shell">
      <section className="panel">
        <header>
          <h1>City autocomplete</h1>
          <p>Type the name of a city to see suggestions with keyboard support.</p>
        </header>
        <Autocomplete items={cities} placeholder="Search cities" />
      </section>
    </main>
  </React.StrictMode>,
);
