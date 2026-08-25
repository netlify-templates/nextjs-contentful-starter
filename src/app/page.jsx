import Link from 'next/link';
import { prisma } from '../lib/prisma.js';
import { averageCategories } from '../lib/ratingCategories.js';
import { Stars } from '../components/Stars.jsx';
import { HomeSearch } from '../components/HomeSearch.jsx';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const recent = await prisma.building.findMany({
    where: { status: 'APPROVED' },
    include: { reviews: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

  const buildings = recent.map((b) => {
    const { reviews, ...building } = b;
    return { ...building, ratings: averageCategories(reviews) };
  });

  return (
    <div>
      <section className="mb-14 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 px-6 py-14 text-center text-white sm:px-12">
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">Rappuarvio</h1>
        <p className="mx-auto mb-8 max-w-xl text-slate-200">
          Kerrostaloarvosteluja asukkailta asukkaille. Katso millaista naapurustossa on ennen
          muuttoa – tai jaa oma kokemuksesi omasta rapustasi.
        </p>

        <HomeSearch />

        <div className="mt-6 text-sm text-slate-300">
          Etkö löytänyt taloasi?{' '}
          <Link href="/ehdota" className="font-medium text-white underline">
            Ehdota sen lisäämistä
          </Link>
        </div>
      </section>

      <section className="mb-14 grid gap-6 sm:grid-cols-3">
        <HowItWorks
          step="1"
          title="Hae taloa"
          text="Etsi kerrostalo osoitteella, postinumerolla tai kaupungilla."
        />
        <HowItWorks
          step="2"
          title="Lue ja arvioi"
          text="Katso muiden asukkaiden arviot äänieristyksestä, rauhallisuudesta ja muusta – tai jätä oma arvostelusi klikkaamalla tähtiä."
        />
        <HowItWorks
          step="3"
          title="Ehdota puuttuvaa taloa"
          text="Jos taloa ei löydy, ehdota sen lisäämistä. Moderaattori tarkistaa tiedot ennen julkaisua."
        />
      </section>

      {buildings.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold">Viimeksi lisätyt talot</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {buildings.map((b) => (
              <li key={b.id}>
                <Link
                  href={`/talo/${b.id}`}
                  className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-slate-400"
                >
                  <p className="font-semibold text-slate-900">{b.address}</p>
                  <p className="mb-2 text-sm text-slate-500">
                    {b.postalCode} {b.city}
                  </p>
                  {b.ratings.overall !== null ? (
                    <Stars value={b.ratings.overall} size="sm" />
                  ) : (
                    <span className="text-xs text-slate-400">Ei vielä arvosteluja</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function HowItWorks({ step, title, text }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
        {step}
      </div>
      <h3 className="mb-1 font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600">{text}</p>
    </div>
  );
}
