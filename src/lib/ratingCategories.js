// Arviointikategoriat, joilla käyttäjät arvioivat kerrostaloa (1-5 tähteä).
export const RATING_CATEGORIES = [
  { key: 'soundInsulation', label: 'Äänieristys' },
  { key: 'quietness', label: 'Rauhallisuus' },
  { key: 'environment', label: 'Ympäristö' },
  { key: 'maintenance', label: 'Kunnossapito' },
  { key: 'safety', label: 'Turvallisuus' },
  { key: 'transport', label: 'Liikenneyhteydet' },
];

export function averageOverall(review) {
  const values = RATING_CATEGORIES.map((c) => review[c.key]).filter(
    (v) => typeof v === 'number'
  );
  if (values.length === 0) return null;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function averageCategories(reviews) {
  const sums = Object.fromEntries(RATING_CATEGORIES.map((c) => [c.key, 0]));
  const counts = Object.fromEntries(RATING_CATEGORIES.map((c) => [c.key, 0]));

  for (const review of reviews) {
    for (const c of RATING_CATEGORIES) {
      const v = review[c.key];
      if (typeof v === 'number') {
        sums[c.key] += v;
        counts[c.key] += 1;
      }
    }
  }

  const averages = {};
  let overallSum = 0;
  let overallCount = 0;
  for (const c of RATING_CATEGORIES) {
    const avg = counts[c.key] > 0 ? sums[c.key] / counts[c.key] : null;
    averages[c.key] = avg;
    if (avg !== null) {
      overallSum += avg;
      overallCount += 1;
    }
  }

  return {
    categories: averages,
    overall: overallCount > 0 ? overallSum / overallCount : null,
    reviewCount: reviews.length,
  };
}
