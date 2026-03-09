import * as bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

import { PrismaClient } from "../src/generated/prisma/client"; 

async function main() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const adapter = new PrismaPg(pool);
  
  const prisma = new PrismaClient({ adapter } as any);

  // ! Example CREDENTIALS (adminEmail, hashedPassword), change as needed
  const adminEmail = "test@mail.com";
  const hashedPassword = await bcrypt.hash("12345678", 10);

  try {
    const admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        name: "Super Admin",
        password: hashedPassword,
        role: "ADMIN" as any,
      },
    });

    console.log("✅ Seed finished. Admin created:", admin.email);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((e) => {
  console.error("❌ Seed error:", e);
  process.exit(1);
});