'use client';

import { useState } from 'react';

export function StarInput({ label, value, onChange }) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <span className="text-sm text-slate-700">{label}</span>
      <div className="flex gap-1" role="radiogroup" aria-label={label}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} / 5`}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(n)}
            className={`text-2xl leading-none transition-colors ${
              shown >= n ? 'text-amber-500' : 'text-slate-300'
            } hover:scale-110`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}
