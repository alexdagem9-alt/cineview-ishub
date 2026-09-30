import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import FormField from '../components/FormField';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { hasErrors, validate } from '../utils/validators';

export default function Login() {
  const { login } = useAuth();
  const { flash } = useUI();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [busy, setBusy] = useState(false);

  // where to go after logging in (set when a page sent you here)
  const redirectTo = location.state?.from || '/';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' })); // clear the error while the user fixes it
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    const found = validate(form, ['email', 'password']);
    setErrors(found);
    if (hasErrors(found)) return;

    setBusy(true);
    const result = await login(form);
    setBusy(false);

    if (result.error) {
      setFormError(result.error);
      return;
    }
    flash(`Welcome, ${result.user.name.split(' ')[0]}!`);
    navigate(redirectTo, { replace: true });
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to download titles."
      onSubmit={handleSubmit}
      formError={formError}
      footer={
        <>
          New here?{' '}
          <Link to="/signup" className="accent font-semibold hover:underline">Sign up</Link>
        </>
      }
    >
      <FormField label="Email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} error={errors.email} />
      <FormField label="Password" name="password" type="password" autoComplete="current-password" value={form.password} onChange={handleChange} error={errors.password} />

      <button disabled={busy} className="btn-primary mt-6 w-full">
        {busy && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />}
        Log in
      </button>
    </AuthLayout>
  );
}
