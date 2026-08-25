'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function EhdotaPage() {
  const { status } = useSession();
  const [form, setForm] = useState({ address: '', postalCode: '', city: '' });
  const [error, setError] = useState('');
  const [existingId, setExistingId] = useState(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  if (status === 'unauthenticated') {
    return (
      <div className="mx-auto max-w-md rounded-lg border border-dashed border-slate-300 p-6 text-center">
        <p className="mb-3 text-slate-600">Kirjaudu sisään ehdottaaksesi uutta kerrostaloa.</p>
        <Link
          href="/kirjaudu?callbackUrl=/ehdota"
          className="inline-block rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700"
        >
          Kirjaudu sisään
        </Link>
      </div>
    );
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setExistingId(null);
    setLoading(true);

    try {
      const res = await fetch('/api/buildings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Ehdotuksen lähetys epäonnistui');
        if (data.existingBuildingId) setExistingId(data.existingBuildingId);
        return;
      }

      setDone(true);
      setForm({ address: '', postalCode: '', city: '' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-2 text-2xl font-bold">Ehdota uutta kerrostaloa</h1>
      <p className="mb-6 text-sm text-slate-600">
        Löysitkö talon, jota ei vielä ole Rappuarviossa? Ehdota sitä alla – moderaattori
        tarkistaa tiedot ennen kuin talo julkaistaan.
      </p>

      {done ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          Kiitos ehdotuksesta! Moderaattori tarkistaa tiedot pian.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Katuosoite
            </label>
            <input
              required
              type="text"
              placeholder="Esim. Sihtikuja 1"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full rounded-md border border-slate-300 px-3 py-2"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Postinumero
              </label>
              <input
                required
                type="text"
                placeholder="90520"
                pattern="\d{5}"
                value={form.postalCode}
                onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                className="w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </div>
            <div className="flex-[2]">
              <label className="mb-1 block text-sm font-medium text-slate-700">Kaupunki</label>
              <input
                required
                type="text"
                placeholder="Oulu"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full rounded-md border border-slate-300 px-3 py-2"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}{' '}
              {existingId && (
                <Link href={`/talo/${existingId}`} className="underline">
                  Näytä olemassa oleva talo
                </Link>
              )}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? 'Lähetetään…' : 'Lähetä ehdotus'}
          </button>
        </form>
      )}
    </div>
  );
}
