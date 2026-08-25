import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '../../../../../lib/auth.js';
import { prisma } from '../../../../../lib/prisma.js';

const ratingField = z.number().int().min(1).max(5);

const schema = z.object({
  residency: z.enum(['CURRENT', 'FORMER']),
  soundInsulation: ratingField,
  quietness: ratingField,
  environment: ratingField,
  maintenance: ratingField,
  safety: ratingField,
  transport: ratingField,
  pros: z.string().trim().max(2000).optional().nullable(),
  cons: z.string().trim().max(2000).optional().nullable(),
  comment: z.string().trim().max(2000).optional().nullable(),
});

export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Kirjaudu sisään jättääksesi arvostelun' }, { status: 401 });
  }

  const { id } = await params;
  const building = await prisma.building.findUnique({ where: { id } });
  if (!building || building.status !== 'APPROVED') {
    return NextResponse.json({ error: 'Kerrostaloa ei löytynyt' }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Virheellinen lomake' },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const review = await prisma.review.upsert({
    where: { buildingId_userId: { buildingId: building.id, userId: session.user.id } },
    update: data,
    create: { ...data, buildingId: building.id, userId: session.user.id },
  });

  return NextResponse.json({ review });
}
