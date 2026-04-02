# Company Structure Validator

Paste a list of employees and instantly check for organizational red flags: duplicate IDs, missing managers, reporting loops, oversized teams, and title saturation.

## Usage

1. Provide an array of employee objects:
   ```json
   [
     { "id": "ceo", "name": "Riya", "title": "CEO" },
     { "id": "cto", "name": "Ishaan", "managerId": "ceo", "title": "CTO" }
   ]
   ```
2. Click **Validate structure**.
3. Review grouped messages (errors, warnings, informational notes) and adjust the data.

## Files

```
company-structure-validator/
├── index.html
├── package.json
├── src/
│   ├── CompanyStructureValidator.jsx
│   ├── index.jsx
│   ├── styles.css
│   └── validateStructure.js
└── vite.config.js
```

## Run locally

```bash
cd company-structure-validator
npm install
npm run dev
```

Open `http://localhost:5173` to use the validator.

## Validation rules

- Every record must be an object with a unique string `id`.
- `managerId` (if present) must reference an existing employee.
- Depth-first search detects cycles (employee managing themselves indirectly).
- Managers with more than eight direct reports trigger a warning.
- Titles repeated more than five times trigger an informational suggestion.
- At least one root-level employee (no manager) must exist.
