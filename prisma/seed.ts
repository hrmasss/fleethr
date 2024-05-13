import { PrismaClient } from "@prisma/client";
import { moduleData } from "prisma/data/module";
import { actionData } from "prisma/data/action";

const prisma = new PrismaClient();

async function main() {
  for (const data of moduleData) {
    await prisma.module.upsert(data);
  }

  for (const data of actionData) {
    await prisma.action.upsert(data);
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
