import "dotenv/config";
import { PrismaClient, Role, Sex, VerificationStatus } from "../src/generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 needs a driver adapter. If you're on Prisma 6, remove the adapter
// lines and use: const prisma = new PrismaClient();
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// 1x1 transparent PNG, used as a placeholder profile picture
const PLACEHOLDER_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  "base64"
);

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const expertiseList = [
  { name: "Cardiology", description: "Heart and blood vessels" },
  { name: "Dermatology", description: "Skin, hair and nails" },
  { name: "Pediatrics", description: "Children's health" },
  { name: "Neurology", description: "Brain and nervous system" },
  { name: "Orthopedics", description: "Bones, joints and muscles" },
  { name: "Psychiatry", description: "Mental health" },
  { name: "Ophthalmology", description: "Eye care" },
  { name: "Obstetrics & Gynecology", description: "Women's reproductive health" },
  { name: "General Medicine", description: "Primary care" },
];

const patients = [
  { name: "Maria Santos", email: "maria.santos@example.com", sex: Sex.FEMALE, age: 28, city: "Manila", concerns: ["Dermatology"] },
  { name: "Juan Dela Cruz", email: "juan.delacruz@example.com", sex: Sex.MALE, age: 34, city: "San Pablo", concerns: ["Cardiology", "General Medicine"] },
  { name: "Ana Reyes", email: "ana.reyes@example.com", sex: Sex.FEMALE, age: 41, city: "Quezon City", concerns: ["Neurology"] },
  { name: "Pedro Garcia", email: "pedro.garcia@example.com", sex: Sex.MALE, age: 52, city: "Cebu City", concerns: ["Orthopedics", "Cardiology"] },
  { name: "Liza Mendoza", email: "liza.mendoza@example.com", sex: Sex.FEMALE, age: 19, city: "Davao City", concerns: ["Psychiatry"] },
  { name: "Carlo Ramos", email: "carlo.ramos@example.com", sex: Sex.MALE, age: 8, city: "Laguna", concerns: ["Pediatrics"] },
  { name: "Grace Villanueva", email: "grace.villanueva@example.com", sex: Sex.FEMALE, age: 36, city: "Makati", concerns: ["Obstetrics & Gynecology"] },
  { name: "Mark Bautista", email: "mark.bautista@example.com", sex: Sex.MALE, age: 45, city: "Pasig", concerns: ["Ophthalmology"] },
  { name: "Joy Aquino", email: "joy.aquino@example.com", sex: Sex.FEMALE, age: 30, city: "Batangas", concerns: [] },
  { name: "Miguel Torres", email: "miguel.torres@example.com", sex: Sex.MALE, age: 61, city: "Iloilo City", concerns: ["Cardiology", "Neurology", "General Medicine"] },
];

const doctors: {
  name: string;
  email: string;
  sex: Sex;
  age: number;
  city: string;
  status: VerificationStatus;
  licenseNumber: string;
  licenseExpiry: string;
  school: string;
  hospital: string;
  education: string;
  expertise: string[];
}[] = [
  {
    name: "Dr. Elena Cruz", email: "elena.cruz@example.com", sex: Sex.FEMALE, age: 45, city: "Manila",
    status: VerificationStatus.APPROVED, licenseNumber: "PRC-100001", licenseExpiry: "2029-06-30",
    school: "University of the Philippines Manila", hospital: "Philippine General Hospital",
    education: "MD, Fellowship in Cardiology", expertise: ["Cardiology"],
  },
  {
    name: "Dr. Roberto Lim", email: "roberto.lim@example.com", sex: Sex.MALE, age: 50, city: "Quezon City",
    status: VerificationStatus.APPROVED, licenseNumber: "PRC-100002", licenseExpiry: "2028-12-31",
    school: "University of Santo Tomas", hospital: "St. Luke's Medical Center",
    education: "MD, Residency in Neurology", expertise: ["Neurology", "General Medicine"],
  },
  {
    name: "Dr. Patricia Tan", email: "patricia.tan@example.com", sex: Sex.FEMALE, age: 38, city: "Makati",
    status: VerificationStatus.APPROVED, licenseNumber: "PRC-100003", licenseExpiry: "2030-03-15",
    school: "Ateneo School of Medicine", hospital: "Makati Medical Center",
    education: "MD, Diplomate in Dermatology", expertise: ["Dermatology"],
  },
  {
    name: "Dr. Antonio Flores", email: "antonio.flores@example.com", sex: Sex.MALE, age: 43, city: "Cebu City",
    status: VerificationStatus.APPROVED, licenseNumber: "PRC-100004", licenseExpiry: "2027-09-01",
    school: "Cebu Institute of Medicine", hospital: "Chong Hua Hospital",
    education: "MD, Residency in Orthopedics", expertise: ["Orthopedics"],
  },
  {
    name: "Dr. Isabel Navarro", email: "isabel.navarro@example.com", sex: Sex.FEMALE, age: 35, city: "Davao City",
    status: VerificationStatus.APPROVED, licenseNumber: "PRC-100005", licenseExpiry: "2029-01-20",
    school: "Davao Medical School Foundation", hospital: "Southern Philippines Medical Center",
    education: "MD, Pediatrics Residency", expertise: ["Pediatrics", "General Medicine"],
  },
  {
    name: "Dr. Gabriel Castillo", email: "gabriel.castillo@example.com", sex: Sex.MALE, age: 40, city: "Pasig",
    status: VerificationStatus.APPROVED, licenseNumber: "PRC-100006", licenseExpiry: "2028-05-10",
    school: "University of the East Ramon Magsaysay", hospital: "The Medical City",
    education: "MD, Residency in Psychiatry", expertise: ["Psychiatry"],
  },
  {
    name: "Dr. Sofia Alvarez", email: "sofia.alvarez@example.com", sex: Sex.FEMALE, age: 33, city: "Laguna",
    status: VerificationStatus.PENDING, licenseNumber: "PRC-100007", licenseExpiry: "2031-02-28",
    school: "De La Salle Health Sciences Institute", hospital: "Calamba Medical Center",
    education: "MD, Residency in Ophthalmology", expertise: ["Ophthalmology"],
  },
  {
    name: "Dr. Daniel Ocampo", email: "daniel.ocampo@example.com", sex: Sex.MALE, age: 47, city: "Batangas",
    status: VerificationStatus.PENDING, licenseNumber: "PRC-100008", licenseExpiry: "2027-11-11",
    school: "Manila Central University", hospital: "Batangas Medical Center",
    education: "MD, Fellowship in Cardiology", expertise: ["Cardiology", "General Medicine"],
  },
  {
    name: "Dr. Carmen Soriano", email: "carmen.soriano@example.com", sex: Sex.FEMALE, age: 39, city: "Iloilo City",
    status: VerificationStatus.PENDING, licenseNumber: "PRC-100009", licenseExpiry: "2030-08-08",
    school: "West Visayas State University", hospital: "Iloilo Mission Hospital",
    education: "MD, Residency in OB-GYN", expertise: ["Obstetrics & Gynecology"],
  },
  {
    name: "Dr. Victor Salazar", email: "victor.salazar@example.com", sex: Sex.MALE, age: 55, city: "Manila",
    status: VerificationStatus.REJECTED, licenseNumber: "PRC-100010", licenseExpiry: "2024-01-01", // expired
    school: "Unknown Medical College", hospital: "Private Clinic",
    education: null as unknown as string,
    expertise: ["General Medicine"],
  },
];

const admin = {
  name: "Admin User",
  email: "admin@example.com",
  sex: Sex.MALE,
  age: 30,
  city: "Manila",
};

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

async function main() {
  console.log("Cleaning old data...");
  // Order matters because of foreign keys
  await prisma.doctorsApplication.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.patients.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();
  await prisma.expertise.deleteMany();

  console.log("Seeding expertise...");
  await prisma.expertise.createMany({ data: expertiseList });

  console.log("Seeding admin...");
  await prisma.user.create({
    data: { ...admin, role: Role.ADMIN, emailVerified: true },
  });

  console.log("Seeding patients...");
  for (const p of patients) {
    await prisma.user.create({
      data: {
        name: p.name,
        email: p.email,
        sex: p.sex,
        age: p.age,
        city: p.city,
        role: Role.PATIENT,
        emailVerified: true,
        patient: {
          create: {
            concern: { connect: p.concerns.map((name) => ({ name })) },
          },
        },
      },
    });
  }

  console.log("Seeding doctors and applications...");
  for (const d of doctors) {
    const approved = d.status === VerificationStatus.APPROVED;
    const reviewed = d.status !== VerificationStatus.PENDING;

    await prisma.user.create({
      data: {
        name: d.name,
        email: d.email,
        sex: d.sex,
        age: d.age,
        city: d.city,
        emailVerified: true,
        // only approved doctors get the DOCTOR role
        role: approved ? Role.DOCTOR : Role.PATIENT,
        doctorApplication: {
          create: {
            licenseNumber: d.licenseNumber,
            licenseExpiry: new Date(d.licenseExpiry),
            school: d.school,
            hospital: d.hospital,
            education: d.education,
            status: d.status,
            reviewedAt: reviewed ? new Date() : null,
            profile: {
              create: {
                name: `${d.email.split("@")[0]}.png`,
                mimeType: "image/png",
                data: PLACEHOLDER_PNG,
              },
            },
            expertise: {
              connect: d.expertise.map((name) => ({ name })),
            },
          },
        },
      },
    });
  }

  const [users, apps, exps] = await Promise.all([
    prisma.user.count(),
    prisma.doctorsApplication.count(),
    prisma.expertise.count(),
  ]);
  console.log(`Done. ${users} users, ${apps} doctor applications, ${exps} expertise.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });