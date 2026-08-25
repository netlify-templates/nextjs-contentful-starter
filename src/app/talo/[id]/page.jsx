import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth.js';
import { prisma } from '../../../lib/prisma.js';
import { RATING_CATEGORIES, averageCategories } from '../../../lib/ratingCategories.js';
import { Stars } from '../../../components/Stars.jsx';
import { ReviewForm } from '../../../components/ReviewForm.jsx';

export default async function BuildingPage({ params }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  const building = await prisma.building.findUnique({
    where: { id },
    include: {
      reviews: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!building || building.status !== 'APPROVED') {
    notFound();
  }

  const ratings = averageCategories(building.reviews);
  const myReview = session?.user
    ? building.reviews.find((r) => r.userId === session.user.id)
    : null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">{building.address}</h1>
        <p className="text-slate-500">
          {building.postalCode} {building.city}
        </p>

        <div className="mt-3 flex items-center gap-3">
          {ratings.overall !== null ? (
            <>
              <Stars value={ratings.overall} size="lg" />
              <span className="text-sm text-slate-500">
                {ratings.reviewCount} arvostelu{ratings.reviewCount === 1 ? '' : 'a'}
              </span>
            </>
          ) : (
            <span className="text-slate-400">Ei vielä arvosteluja – ole ensimmäinen!</span>
          )}
        </div>
      </div>

      {ratings.overall !== null && (
        <div className="mb-8 grid grid-cols-2 gap-x-6 gap-y-2 rounded-lg border border-slate-200 bg-white p-5 sm:grid-cols-3">
          {RATING_CATEGORIES.map((c) => (
            <div key={c.key} className="flex items-center justify-between gap-2">
              <span className="text-sm text-slate-600">{c.label}</span>
              {ratings.categories[c.key] !== null ? (
                <Stars value={ratings.categories[c.key]} size="sm" />
              ) : (
                <span className="text-xs text-slate-400">–</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mb-8">
        <ReviewForm buildingId={building.id} existingReview={myReview} />
      </div>

      <h2 className="mb-3 text-lg font-semibold">Arvostelut</h2>
      <ul className="space-y-4">
        {building.reviews.map((r) => (
          <li key={r.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <span className="font-medium text-slate-900">{r.user.name}</span>
                <span className="ml-2 text-xs text-slate-400">
                  {r.residency === 'CURRENT' ? 'Asuu täällä' : 'Asui täällä aiemmin'}
                </span>
              </div>
              <Stars
                value={
                  RATING_CATEGORIES.reduce((sum, c) => sum + r[c.key], 0) / RATING_CATEGORIES.length
                }
                size="sm"
              />
            </div>

            {r.pros && (
              <p className="text-sm text-slate-700">
                <span className="font-medium text-emerald-700">Hyvää: </span>
                {r.pros}
              </p>
            )}
            {r.cons && (
              <p className="text-sm text-slate-700">
                <span className="font-medium text-red-700">Huonoa: </span>
                {r.cons}
              </p>
            )}
            {r.comment && (
              <p className="mt-1 text-sm italic text-slate-600">&ldquo;{r.comment}&rdquo;</p>
            )}
          </li>
        ))}

        {building.reviews.length === 0 && (
          <p className="text-slate-500">Tälle talolle ei ole vielä arvosteluja.</p>
        )}
      </ul>
    </div>
  );
}
