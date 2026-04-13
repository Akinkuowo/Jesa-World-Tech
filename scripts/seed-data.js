const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    const categories = [
      "Web Development",
      "Mobile Development",
      "Data Science",
      "Machine Learning",
      "Cloud Computing",
      "Cyber Security",
      "UI/UX Design",
      "Digital Marketing",
      "Project Management",
      "Artificial Intelligence",
      "Game Development",
      "DevOps",
      "Blockchain",
      "Internet of Things",
      "Quality Assurance"
    ];

    const levels = [
      "Free",
      "Beginner",
      "Intermediate",
      "Advance"
    ];

    console.log("Seeding categories...");
    for (const category of categories) {
      await database.category.upsert({
        where: { name: category },
        update: {},
        create: { name: category },
      });
    }

    console.log("Seeding levels...");
    for (const level of levels) {
      await database.level.upsert({
        where: { name: level },
        update: {},
        create: { name: level },
      });
    }

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories/levels", error);
  } finally {
    await database.$disconnect();
  }
}

main();
