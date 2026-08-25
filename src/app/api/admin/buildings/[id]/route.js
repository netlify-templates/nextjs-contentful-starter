import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '../../../../../lib/auth.js';
import { prisma } from '../../../../../lib/prisma.js';
import { normalizeBuildingKey } from '../../../../../lib/buildings.js';

const schema = z.object({
  address: z.string().trim().min(3).max(200),
  postalCode: z.string().trim().regex(/^\d{5}$/),
  city: z.string().trim().min(2).max(100),
  moderatorNote: z.string().trim().max(1000).optional().nullable(),
});

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Ei oikeuksia' }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Virheellinen lomake' },
      { status: 400 }
    );
  }

  const { address, postalCode, city, moderatorNote } = parsed.data;
  const normalizedKey = normalizeBuildingKey({ address, postalCode, city });
  const { id } = await params;

  const conflict = await prisma.building.findFirst({
    where: { normalizedKey, NOT: { id } },
  });
  if (conflict) {
    return NextResponse.json(
      { error: 'Toinen talo tällä osoitteella on jo järjestelmässä' },
      { status: 409 }
    );
  }

  const building = await prisma.building.update({
    where: { id },
    data: { address, postalCode, city, normalizedKey, moderatorNote },
  });

  return NextResponse.json({ building });
}
