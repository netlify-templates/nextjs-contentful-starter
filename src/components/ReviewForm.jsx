'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { RATING_CATEGORIES } from '../lib/ratingCategories.js';
import { StarInput } from './StarInput.jsx';

const emptyRatings = Object.fromEntries(RATING_CATEGORIES.map((c) => [c.key, 0]));

export function ReviewForm({ buildingId, existingReview }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [residency, setResidency] = useState(existingReview?.residency ?? 'CURRENT');
  const [ratings, setRatings] = useState(() =>
    existingReview
      ? Object.fromEntries(RATING_CATEGORIES.map((c) => [c.key, existingReview[c.key]]))
      : emptyRatings
  );
  const [pros, setPros] = useState(existingReview?.pros ?? '');
  const [cons, setCons] = useState(existingReview?.cons ?? '');
  const [comment, setComment] = useState(existingReview?.comment ?? '');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (status === 'loading') return null;

  if (status === 'unauthenticated') {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center">
        <p className="mb-3 text-slate-600">Kirjaudu sisään jättääksesi arvostelun.</p>
        <Link
          href={`/kirjaudu?callbackUrl=/talo/${buildingId}`}
          className="inline-block rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700"
        >
          Kirjaudu sisään
        </Link>
      </div>
    );
  }

  const allRated = RATING_CATEGORIES.every((c) => ratings[c.key] > 0);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');

    if (!allRated) {
      setError('Anna arvosana kaikille kategorioille');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/buildings/${buildingId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ residency, ...ratings, pros, cons, comment }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Arvostelun tallennus epäonnistui');
        return;
      }

      setSaved(true);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="mb-4 text-lg font-semibold">
        {existingReview ? 'Muokkaa arvosteluasi' : 'Jätä arvostelu'}
      </h3>

      <div className="mb-4 flex gap-4 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={residency === 'CURRENT'}
            onChange={() => setResidency('CURRENT')}
          />
          Asun täällä
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={residency === 'FORMER'}
            onChange={() => setResidency('FORMER')}
          />
          Asuin täällä aiemmin
        </label>
      </div>

      <div className="mb-4 divide-y divide-slate-100 rounded-md border border-slate-100 px-3">
        {RATING_CATEGORIES.map((c) => (
          <StarInput
            key={c.key}
            label={c.label}
            value={ratings[c.key]}
            onChange={(v) => setRatings((r) => ({ ...r, [c.key]: v }))}
          />
        ))}
      </div>

      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Mikä tässä talossa oli hyvää?
        </label>
        <textarea
          value={pros}
          onChange={(e) => setPros(e.target.value)}
          rows={2}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="mb-3">
        <label className="mb-1 block text-sm font-medium text-slate-700">Mikä oli huonoa?</label>
        <textarea
          value={cons}
          onChange={(e) => setCons(e.target.value)}
          rows={2}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-slate-700">Vapaa kommentti</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={2}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      {saved && <p className="mb-3 text-sm text-emerald-600">Arvostelu tallennettu, kiitos!</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-md bg-slate-900 px-5 py-2 font-medium text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {saving ? 'Tallennetaan…' : existingReview ? 'Päivitä arvostelu' : 'Lähetä arvostelu'}
      </button>
    </form>
  );
}
