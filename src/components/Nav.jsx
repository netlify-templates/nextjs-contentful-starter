'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export function Nav() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <span aria-hidden className="text-2xl">🏢</span>
          Rappuarvio
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <Link href="/haku" className="hover:text-slate-900">
            Hae taloa
          </Link>
          <Link href="/ehdota" className="hover:text-slate-900">
            Ehdota taloa
          </Link>

          {status === 'authenticated' && session.user.role === 'ADMIN' && (
            <Link href="/admin" className="hover:text-slate-900">
              Moderointi
            </Link>
          )}

          {status === 'authenticated' ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-slate-500 sm:inline">Hei, {session.user.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-100"
              >
                Kirjaudu ulos
              </button>
            </div>
          ) : status === 'unauthenticated' ? (
            <div className="flex items-center gap-2">
              <Link href="/kirjaudu" className="hover:text-slate-900">
                Kirjaudu
              </Link>
              <Link
                href="/rekisteroidy"
                className="rounded-md bg-slate-900 px-3 py-1.5 text-white hover:bg-slate-700"
              >
                Luo tili
              </Link>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
