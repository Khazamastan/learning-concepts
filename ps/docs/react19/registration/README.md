# React 19 Registration Form

- Uses `useActionState` to model an async submission flow with optimistic UI.
- Exposes "Form Submitted Successfully" message to match testing expectations.
- Renders the submitted payload for quick verification.

## Usage
```jsx
import RegistrationForm from './RegistrationForm.jsx';
import './RegistrationForm.css';

export default function Page() {
  return <RegistrationForm />;
}
```
