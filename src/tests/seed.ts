import { prisma } from "../../lib/prisma.ts";

export async function resetAndSeedTest() {
  await prisma.doctorsApplication.deleteMany();
  await prisma.patients.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verification.deleteMany();
  await prisma.rateLimit.deleteMany();
  await prisma.user.deleteMany();
}