import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationForm from '../forms/RegistrationForm';

describe('RegistrationForm', () => {
  it('submits data and shows success message', async () => {
    render(<RegistrationForm />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Ada Lovelace' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'ada@example.com' } });
    fireEvent.change(screen.getByLabelText(/Role/i), { target: { value: 'engineer' } });
    fireEvent.click(screen.getByLabelText(/Pro/i));

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Form Submitted Successfully')).toBeInTheDocument();
    });
  });
});
