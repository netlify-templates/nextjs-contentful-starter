import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma.js';
import { averageCategories } from '../../../../lib/ratingCategories.js';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').trim();

  const tokens = q
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const where = {
    status: 'APPROVED',
    ...(tokens.length > 0
      ? {
          AND: tokens.map((t) => ({
            OR: [
              { address: { contains: t, mode: 'insensitive' } },
              { city: { contains: t, mode: 'insensitive' } },
              { postalCode: { contains: t, mode: 'insensitive' } },
            ],
          })),
        }
      : {}),
  };

  const buildings = await prisma.building.findMany({
    where,
    include: { reviews: true },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  const results = buildings.map((b) => {
    const { reviews, ...building } = b;
    return { ...building, ratings: averageCategories(reviews) };
  });

  return NextResponse.json({ results });
}
