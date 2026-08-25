import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth.js';
import { prisma } from '../../lib/prisma.js';
import { AdminBuildingCard } from '../../components/AdminBuildingCard.jsx';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/kirjaudu?callbackUrl=/admin');
  }
  if (session.user.role !== 'ADMIN') {
    return (
      <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">
        Sinulla ei ole oikeuksia moderointiin.
      </div>
    );
  }

  const pending = await prisma.building.findMany({
    where: { status: 'PENDING' },
    include: { submittedBy: { select: { name: true, email: true } } },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Moderointi</h1>
      <p className="mb-6 text-sm text-slate-600">
        Tarkista käyttäjien ehdottamat kerrostalot ennen julkaisua. Varmista, että osoite,
        postinumero ja kaupunki ovat oikein, ja tarkista ettei taloa jo ole järjestelmässä.
      </p>

      {pending.length === 0 ? (
        <p className="text-slate-500">Ei tarkistettavia ehdotuksia.</p>
      ) : (
        <ul className="space-y-4">
          {pending.map((b) => (
            <li key={b.id}>
              <AdminBuildingCard building={b} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
