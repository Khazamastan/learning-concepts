import { useActionState, useMemo } from 'react';
import './RegistrationForm.css';

async function submitForm(previousState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const data = Object.fromEntries(formData.entries());
  return {
    lastSubmission: data,
    message: 'Form Submitted Successfully'
  };
}

const initialState = {
  lastSubmission: null,
  message: ''
};

export default function RegistrationForm() {
  const [state, formAction, pending] = useActionState(submitForm, initialState);

  const statusLabel = useMemo(() => {
    if (pending) return 'Submitting…';
    if (state.message) return state.message;
    return 'Fill out the form';
  }, [pending, state.message]);

  return (
    <form className="registration" action={formAction}>
      <h1>Register</h1>

      <label htmlFor="fullName">Full Name</label>
      <input id="fullName" name="fullName" required />

      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" required />

      <label htmlFor="role">Role</label>
      <select id="role" name="role" required defaultValue="">
        <option value="" disabled>
          Select role
        </option>
        <option value="designer">Designer</option>
        <option value="engineer">Engineer</option>
        <option value="pm">Product Manager</option>
      </select>

      <fieldset>
        <legend>Plan</legend>
        <label>
          <input type="radio" name="plan" value="basic" required /> Basic
        </label>
        <label>
          <input type="radio" name="plan" value="pro" /> Pro
        </label>
        <label>
          <input type="radio" name="plan" value="team" /> Team
        </label>
      </fieldset>

      <button type="submit" disabled={pending}>
        {pending ? 'Submitting…' : 'Submit'}
      </button>

      <p role="status" className="registration__status">
        {statusLabel}
      </p>

      {state.lastSubmission && (
        <pre className="registration__preview" aria-live="polite">
          {JSON.stringify(state.lastSubmission, null, 2)}
        </pre>
      )}
    </form>
  );
}
