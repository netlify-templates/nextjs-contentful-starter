import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../../../lib/prisma.js';

const schema = z.object({
  name: z.string().trim().min(2, 'Nimi on liian lyhyt').max(80),
  email: z.string().trim().toLowerCase().email('Sähköposti ei ole kelvollinen'),
  password: z.string().min(8, 'Salasanan pitää olla vähintään 8 merkkiä').max(200),
});

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Virheellinen lomake' },
      { status: 400 }
    );
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { error: 'Sähköpostiosoite on jo käytössä' },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: { name, email, passwordHash },
  });

  return NextResponse.json({ ok: true });
}
