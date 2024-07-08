import { PrismaClient } from "@prisma/client";
import { moduleData } from "prisma/data/module";
import { actionData } from "prisma/data/action";
import { seedTestData } from "prisma/data/test";

const prisma = new PrismaClient();
const isDebugMode = process.env.NODE_ENV !== "production";

async function main() {
  for (const data of moduleData) {
    await prisma.module.upsert(data);
  }

  for (const data of actionData) {
    await prisma.action.upsert(data);
  }

  // Seed test data only in debug mode
  if (isDebugMode) {
    console.log("🌱 Seeding test data...");
    await seedTestData(prisma);
    console.log("✅ Test data seeding completed.");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
