const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function test() {
  try {
    console.log("Models on db:", Object.keys(db).filter(k => !k.startsWith("_") && !k.startsWith("$")));
    const footer = await db.footerConfig.findUnique({ where: { id: "default" } });
    console.log("Footer query success:", !!footer);
  } catch (error) {
    console.error("Footer query failed:", error.message);
  } finally {
    await db.$disconnect();
  }
}

test();
