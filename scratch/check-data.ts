const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const chapters = await prisma.chapter.findMany({
    where: { title: { contains: "Introduction" } },
    include: { muxData: true }
  });
  console.log(JSON.stringify(chapters, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
