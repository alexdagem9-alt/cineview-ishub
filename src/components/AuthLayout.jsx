// Centered card used by the login and signup pages
export default function AuthLayout({ title, subtitle, onSubmit, formError, children, footer }) {
  return (
    <div className="mx-auto mt-10 w-full max-w-md px-4 pb-16">
      <form onSubmit={onSubmit} noValidate className="panel p-6 shadow-xl shadow-emerald-500/10">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="muted mt-1 text-sm">{subtitle}</p>

        {formError && (
          <p role="alert" className="mt-4 rounded-xl bg-red-500/10 px-4 py-2.5 text-sm text-red-600 dark:text-red-400">
            {formError}
          </p>
        )}

        {children}

        <p className="muted mt-5 text-center text-sm">{footer}</p>
      </form>
    </div>
  );
}
