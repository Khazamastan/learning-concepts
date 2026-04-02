import { useForm } from 'react-hook-form';

type SignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const SignUpPage = () => {
  const { register, handleSubmit } = useForm<SignUpForm>();

  const submit = (values: SignUpForm) => {
    // TODO integrate with API
    console.log(values);
  };

  return (
    <section className="mx-auto max-w-md space-y-6 rounded-lg border border-slate-800 bg-slate-900/80 p-8 shadow-lg">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-white">Create your account</h1>
        <p className="text-sm text-slate-400">Start booking seats in seconds</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(submit)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm text-slate-300">First name</span>
            <input
              type="text"
              {...register('firstName')}
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Last name</span>
            <input
              type="text"
              {...register('lastName')}
              className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
            />
          </label>
        </div>
        <label className="block">
          <span className="text-sm text-slate-300">Email</span>
          <input
            type="email"
            {...register('email')}
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Password</span>
          <input
            type="password"
            {...register('password')}
            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white focus:border-primary focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
        >
          Sign Up
        </button>
      </form>
    </section>
  );
};
