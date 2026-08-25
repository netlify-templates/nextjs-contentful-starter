import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../../lib/auth.js';
import { prisma } from '../../../../../../lib/prisma.js';

export async function POST(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Ei oikeuksia' }, { status: 403 });
  }

  const body = await request.json().catch(() => ({}));
  const { id } = await params;

  const building = await prisma.building.update({
    where: { id },
    data: {
      status: 'REJECTED',
      reviewedById: session.user.id,
      moderatorNote: body.moderatorNote ?? undefined,
    },
  });

  return NextResponse.json({ building });
}
