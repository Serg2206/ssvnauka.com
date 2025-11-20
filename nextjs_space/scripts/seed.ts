
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create default admin user
  const hashedPassword = await bcrypt.hash('johndoe123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      name: 'John Doe',
      hashedPassword: hashedPassword,
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create test user
  const testHashedPassword = await bcrypt.hash('password123', 10);
  
  const testUser = await prisma.user.upsert({
    where: { email: 'test@ssvnauka.com' },
    update: {},
    create: {
      email: 'test@ssvnauka.com',
      name: 'Test User',
      hashedPassword: testHashedPassword,
    },
  });

  console.log('✅ Test user created:', testUser.email);

  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
