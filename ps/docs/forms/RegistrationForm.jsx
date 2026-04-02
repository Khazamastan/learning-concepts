import { useState } from 'react';

const initialState = {
  fullName: '',
  email: '',
  role: '',
  plan: ''
};

export default function RegistrationForm() {
  const [values, setValues] = useState(initialState);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('Form Submitted Successfully');
  };

  return (
    <form onSubmit={handleSubmit} aria-label="registration">
      <label htmlFor="fullName">Full Name</label>
      <input id="fullName" name="fullName" value={values.fullName} onChange={handleChange} required />

      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" value={values.email} onChange={handleChange} required />

      <label htmlFor="role">Role</label>
      <select id="role" name="role" value={values.role} onChange={handleChange} required>
        <option value="">Select role</option>
        <option value="designer">Designer</option>
        <option value="engineer">Engineer</option>
        <option value="pm">Product Manager</option>
      </select>

      <fieldset>
        <legend>Plan</legend>
        <label>
          <input type="radio" name="plan" value="basic" checked={values.plan === 'basic'} onChange={handleChange} required />
          Basic
        </label>
        <label>
          <input type="radio" name="plan" value="pro" checked={values.plan === 'pro'} onChange={handleChange} />
          Pro
        </label>
        <label>
          <input type="radio" name="plan" value="team" checked={values.plan === 'team'} onChange={handleChange} />
          Team
        </label>
      </fieldset>

      <button type="submit">Submit</button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
