import "dotenv/config";
import { defineConfig } from "@prisma/prisma7/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "postgresql://postgres:postgres@localhost:5432/aias_db?schema=public",
  },
});
