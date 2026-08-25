'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AdminBuildingCard({ building }) {
  const router = useRouter();
  const [form, setForm] = useState({
    address: building.address,
    postalCode: building.postalCode,
    city: building.city,
    moderatorNote: building.moderatorNote ?? '',
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function saveChanges() {
    setError('');
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/buildings/${building.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Tallennus epäonnistui');
        return false;
      }
      router.refresh();
      return true;
    } finally {
      setBusy(false);
    }
  }

  async function approve() {
    const saveOk = await saveChanges();
    if (!saveOk) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/buildings/${building.id}/approve`, { method: 'POST' });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Hyväksyntä epäonnistui');
        return;
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function reject() {
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/buildings/${building.id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moderatorNote: form.moderatorNote }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? 'Hylkäys epäonnistui');
        return;
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <p className="mb-3 text-xs text-slate-400">
        Ehdottanut: {building.submittedBy?.name ?? 'Tuntematon'} ({building.submittedBy?.email})
      </p>

      <div className="mb-3 grid gap-3 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Katuosoite</label>
          <input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Postinumero</label>
          <input
            value={form.postalCode}
            onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600">Kaupunki</label>
          <input
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="mb-1 block text-xs font-medium text-slate-600">
          Moderaattorin muistiinpano (näkyy vain moderaattoreille)
        </label>
        <input
          value={form.moderatorNote}
          onChange={(e) => setForm({ ...form, moderatorNote: e.target.value })}
          className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm"
        />
      </div>

      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={busy}
          onClick={saveChanges}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 disabled:opacity-50"
        >
          Tallenna muutokset
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={approve}
          className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
        >
          Hyväksy
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={reject}
          className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-50"
        >
          Hylkää
        </button>
      </div>
    </div>
  );
}
