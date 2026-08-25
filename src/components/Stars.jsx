const SIZES = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
};

export function Stars({ value, size = 'md' }) {
  const rounded = Math.round((value ?? 0) * 2) / 2;

  return (
    <span className={`inline-flex items-center gap-0.5 ${SIZES[size]}`} aria-label={`${value?.toFixed(1)} / 5 tähteä`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = rounded >= n;
        const half = !filled && rounded >= n - 0.5;
        return (
          <span key={n} className="relative text-slate-300" aria-hidden>
            ★
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden text-amber-500"
                style={{ width: filled ? '100%' : '50%' }}
              >
                ★
              </span>
            )}
          </span>
        );
      })}
      <span className="ml-1 text-sm font-medium text-slate-600">{value?.toFixed(1)}</span>
    </span>
  );
}
