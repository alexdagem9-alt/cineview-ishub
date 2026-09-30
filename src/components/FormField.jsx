// Label + input + error message used by the login and signup forms
export default function FormField({ label, name, type = 'text', value, onChange, error, autoComplete }) {
  return (
    <div className="mt-4">
      <label htmlFor={name} className="block text-sm font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`input mt-1.5 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30 dark:border-red-500' : ''}`}
      />
      {error && <p role="alert" className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
