import { useMemo, useState } from 'react';
import './styles.css';

const validators = {
  name: (value) => {
    if (!value.trim()) return 'Name is required.';
    if (value.trim().length < 3) return 'Name must be at least 3 characters.';
    return '';
  },
  email: (value) => {
    if (!value.trim()) return 'Email is required.';
    const pattern = /[^@\s]+@[^@\s]+\.[^@\s]+/;
    if (!pattern.test(value)) return 'Enter a valid email.';
    return '';
  },
  password: (value) => {
    if (value.length < 8) return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(value)) return 'Include at least one uppercase letter.';
    if (!/[0-9]/.test(value)) return 'Include at least one number.';
    return '';
  }
};

export default function App() {
  const [values, setValues] = useState({ name: '', email: '', password: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => ({
    name: validators.name(values.name),
    email: validators.email(values.email),
    password: validators.password(values.password)
  }), [values]);

  const isValid = Object.values(errors).every((error) => error === '');

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ name: true, email: true, password: true });
    if (isValid) {
      setSubmitted(true);
    }
  };

  return (
    <main className="form-shell">
      <section className="form-card">
        <header>
          <p className="eyebrow">Sign up</p>
          <h1>Form Validation</h1>
          <p className="support">Custom validation runs on change and blur, showing realtime hints.</p>
        </header>
        <form onSubmit={handleSubmit} noValidate>
          <label>
            <span>Name</span>
            <input
              value={values.name}
              onChange={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder="Ada Lovelace"
            />
            {touched.name && errors.name && <p className="error">{errors.name}</p>}
          </label>
          <label>
            <span>Email</span>
            <input
              value={values.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="ada@example.com"
              type="email"
            />
            {touched.email && errors.email && <p className="error">{errors.email}</p>}
          </label>
          <label>
            <span>Password</span>
            <input
              value={values.password}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholder="At least 8 characters"
              type="password"
            />
            {touched.password && errors.password && <p className="error">{errors.password}</p>}
            <p className="hint">Must include uppercase and number.</p>
          </label>
          <button type="submit" disabled={!isValid}>
            Create account
          </button>
        </form>
        {submitted && (
          <aside className="success" role="status">
            🎉 Account ready! You passed all validation rules.
          </aside>
        )}
      </section>
    </main>
  );
}
