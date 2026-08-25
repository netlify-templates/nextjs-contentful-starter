import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { RATING_CATEGORIES } from '../src/lib/ratingCategories.js';
import { normalizeBuildingKey } from '../src/lib/buildings.js';

const prisma = new PrismaClient();

async function upsertUser({ name, email, password, role }) {
  const passwordHash = await bcrypt.hash(password, 12);
  return prisma.user.upsert({
    where: { email },
    update: {},
    create: { name, email, passwordHash, role },
  });
}

async function upsertBuilding({ address, postalCode, city, status, submittedById, reviewedById }) {
  const normalizedKey = normalizeBuildingKey({ address, postalCode, city });
  return prisma.building.upsert({
    where: { normalizedKey },
    update: {},
    create: { address, postalCode, city, normalizedKey, status, submittedById, reviewedById },
  });
}

async function main() {
  const admin = await upsertUser({
    name: 'Ylläpitäjä',
    email: 'admin@rappuarvio.fi',
    password: 'AdminSalasana123',
    role: 'ADMIN',
  });

  const asukas1 = await upsertUser({
    name: 'Maija Meikäläinen',
    email: 'maija@example.com',
    password: 'Salasana123',
    role: 'USER',
  });

  const asukas2 = await upsertUser({
    name: 'Pekka Virtanen',
    email: 'pekka@example.com',
    password: 'Salasana123',
    role: 'USER',
  });

  const talo1 = await upsertBuilding({
    address: 'Sihtikuja 1',
    postalCode: '90520',
    city: 'Oulu',
    status: 'APPROVED',
    submittedById: asukas1.id,
    reviewedById: admin.id,
  });

  const talo2 = await upsertBuilding({
    address: 'Mannerheimintie 10',
    postalCode: '00100',
    city: 'Helsinki',
    status: 'APPROVED',
    submittedById: asukas2.id,
    reviewedById: admin.id,
  });

  await upsertBuilding({
    address: 'Kirkkokatu 5',
    postalCode: '90100',
    city: 'Oulu',
    status: 'PENDING',
    submittedById: asukas2.id,
  });

  const ratings1 = { soundInsulation: 4, quietness: 5, environment: 4, maintenance: 4, safety: 5, transport: 3 };
  const ratings2 = { soundInsulation: 2, quietness: 3, environment: 4, maintenance: 3, safety: 4, transport: 5 };

  await prisma.review.upsert({
    where: { buildingId_userId: { buildingId: talo1.id, userId: asukas1.id } },
    update: {},
    create: {
      buildingId: talo1.id,
      userId: asukas1.id,
      residency: 'CURRENT',
      ...ratings1,
      pros: 'Todella rauhallinen talo ja hyvät naapurit.',
      cons: 'Hissi on joskus epäluotettava.',
      comment: 'Suosittelen lämpimästi!',
    },
  });

  await prisma.review.upsert({
    where: { buildingId_userId: { buildingId: talo2.id, userId: asukas2.id } },
    update: {},
    create: {
      buildingId: talo2.id,
      userId: asukas2.id,
      residency: 'FORMER',
      ...ratings2,
      pros: 'Loistava sijainti keskustassa.',
      cons: 'Äänieristys huono, kuulee naapurit hyvin.',
      comment: 'Asuin täällä kolme vuotta, keskeinen sijainti korvasi melun.',
    },
  });

  console.log('Siemendata luotu:');
  console.log('  Admin:', admin.email, '/ AdminSalasana123');
  console.log('  Käyttäjä:', asukas1.email, '/ Salasana123');
  console.log('  Käyttäjä:', asukas2.email, '/ Salasana123');
  console.log('Kategoriat käytössä:', RATING_CATEGORIES.map((c) => c.key).join(', '));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
