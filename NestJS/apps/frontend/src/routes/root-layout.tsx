import { Outlet } from 'react-router-dom';

import { Header } from '../components/ui/header';

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
};
