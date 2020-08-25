import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  // await prisma.user.create({
  //   data: {
  //     name: 'Jack',
  //     email: 'jbiscupski@gmail.com',
  //     poems: {
  //       create: { title: 'Hello World', content: 'This is my first poem' }
  //     }
  //   }
  // })

  const allPoems = await prisma.poem.findMany();
  console.log(allPoems);
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })