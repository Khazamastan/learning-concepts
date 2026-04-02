import { PrismaClient, Role } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await argon2.hash('Admin123!');

  await prisma.user.upsert({
    where: { email: 'admin@cinema.local' },
    update: {},
    create: {
      email: 'admin@cinema.local',
      passwordHash: adminPassword,
      firstName: 'Cinema',
      lastName: 'Admin',
      role: Role.ADMIN,
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
