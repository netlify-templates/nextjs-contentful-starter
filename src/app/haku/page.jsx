'use client';

import { Suspense, useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Stars } from '../../components/Stars.jsx';

export default function HakuPage() {
  return (
    <Suspense fallback={null}>
      <HakuContent />
    </Suspense>
  );
}

function HakuContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const runSearch = useCallback(async (q) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/buildings/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    runSearch(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    router.push(`/haku?q=${encodeURIComponent(query)}`);
    runSearch(query);
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Hae kerrostaloa</h1>

      <form onSubmit={onSubmit} className="mb-8 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Esim. Sihtikuja 1, 90520, Oulu"
          className="flex-1 rounded-md border border-slate-300 px-4 py-2"
        />
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-5 py-2 font-medium text-white hover:bg-slate-700"
        >
          Hae
        </button>
      </form>

      {loading && <p className="text-slate-500">Haetaan…</p>}

      {!loading && results && results.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center">
          <p className="mb-3 text-slate-600">Hakuehdoilla ei löytynyt yhtään kerrostaloa.</p>
          <Link href="/ehdota" className="font-medium text-slate-900 underline">
            Ehdota uutta kerrostaloa
          </Link>
        </div>
      )}

      {!loading && results && results.length > 0 && (
        <ul className="space-y-3">
          {results.map((b) => (
            <li key={b.id}>
              <Link
                href={`/talo/${b.id}`}
                className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-slate-400"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">{b.address}</p>
                    <p className="text-sm text-slate-500">
                      {b.postalCode} {b.city}
                    </p>
                  </div>
                  <div className="text-right">
                    {b.ratings.overall !== null ? (
                      <>
                        <Stars value={b.ratings.overall} size="sm" />
                        <p className="text-xs text-slate-500">
                          {b.ratings.reviewCount} arvostelua
                        </p>
                      </>
                    ) : (
                      <p className="text-xs text-slate-400">Ei vielä arvosteluja</p>
                    )}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
