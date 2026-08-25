'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    router.push(`/haku?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto flex max-w-lg gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Esim. Sihtikuja 1, 90520, Oulu"
        className="flex-1 rounded-md border-0 px-4 py-2.5 text-slate-900"
      />
      <button
        type="submit"
        className="rounded-md bg-white px-5 py-2.5 font-medium text-slate-900 hover:bg-slate-200"
      >
        Hae
      </button>
    </form>
  );
}
