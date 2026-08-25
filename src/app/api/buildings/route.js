import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '../../../lib/auth.js';
import { prisma } from '../../../lib/prisma.js';
import { normalizeBuildingKey } from '../../../lib/buildings.js';

const schema = z.object({
  address: z.string().trim().min(3, 'Anna katuosoite').max(200),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, 'Postinumero on 5 numeroa'),
  city: z.string().trim().min(2, 'Anna kaupunki').max(100),
});

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Kirjaudu sisään ehdottaaksesi kerrostaloa' },
      { status: 401 }
    );
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Virheellinen lomake' },
      { status: 400 }
    );
  }

  const { address, postalCode, city } = parsed.data;
  const normalizedKey = normalizeBuildingKey({ address, postalCode, city });

  const existing = await prisma.building.findUnique({ where: { normalizedKey } });
  if (existing) {
    if (existing.status === 'APPROVED') {
      return NextResponse.json(
        {
          error: 'Tämä kerrostalo on jo järjestelmässä.',
          existingBuildingId: existing.id,
        },
        { status: 409 }
      );
    }
    if (existing.status === 'PENDING') {
      return NextResponse.json(
        { error: 'Tämä kerrostalo odottaa jo moderaattorin tarkistusta.' },
        { status: 409 }
      );
    }
    // Previously rejected: allow a fresh look by moderators.
    const reopened = await prisma.building.update({
      where: { id: existing.id },
      data: {
        status: 'PENDING',
        submittedById: session.user.id,
        reviewedById: null,
        moderatorNote: null,
      },
    });
    return NextResponse.json({ building: reopened });
  }

  const building = await prisma.building.create({
    data: {
      address,
      postalCode,
      city,
      normalizedKey,
      status: 'PENDING',
      submittedById: session.user.id,
    },
  });

  return NextResponse.json({ building });
}
