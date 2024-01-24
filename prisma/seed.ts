import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.users.createMany({
    data: [
      {
        id: '434d9319-e56c-4a7e-b5d8-011b2ccbcecc',
        name: 'Joe Dan',
        email: 'joe@provider.com',
        password: await hash('JoePassword@', 8),
      },
      {
        id: '0c60ec68-48f0-4c00-8790-5ce73d5c81e9',
        name: 'Lup Done',
        email: 'lup@provider.com',
        password: await hash('LupPassword@', 8),
      },
    ],
  });

  await prisma.categories.createMany({
    data: [
      {
        id: '17b07634-f158-4b6c-a557-d80e513acc1d',
        name: 'Tecnologia',
      },
      {
        id: '74b405b0-745e-4eb6-bdfd-dde4fb6a26e7',
        name: 'Carreira',
      },
    ],
  });

  await prisma.posts.createMany({
    data: [
      {
        title: 'Title Post 1',
        content: 'Content Post 1',
        image: 'https://source.unsplash.com/random/200x200?sig=1',
        categoryId: '17b07634-f158-4b6c-a557-d80e513acc1d',
        userId: '434d9319-e56c-4a7e-b5d8-011b2ccbcecc',
      },
      {
        title: 'Title Post 2',
        content: 'Content Post 2',
        image: 'https://source.unsplash.com/random/200x200?sig=2',
        categoryId: '74b405b0-745e-4eb6-bdfd-dde4fb6a26e7',
        userId: '0c60ec68-48f0-4c00-8790-5ce73d5c81e9',
      },
    ],
  });
};

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
