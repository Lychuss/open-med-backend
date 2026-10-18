/*
  Warnings:

  - You are about to drop the `_DoctorsToExpertise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DoctorsToExpertise" DROP CONSTRAINT "_DoctorsToExpertise_A_fkey";

-- DropForeignKey
ALTER TABLE "_DoctorsToExpertise" DROP CONSTRAINT "_DoctorsToExpertise_B_fkey";

-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_userId_fkey";

-- DropTable
DROP TABLE "_DoctorsToExpertise";

-- DropTable
DROP TABLE "doctors";

-- CreateTable
CREATE TABLE "doctors_application" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "licenseExpiry" TIMESTAMP(3) NOT NULL,
    "school" TEXT NOT NULL,
    "hospital" TEXT NOT NULL,
    "education" TEXT,
    "status" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "doctors_application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DoctorsApplicationToExpertise" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DoctorsApplicationToExpertise_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctors_application_userId_key" ON "doctors_application"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_application_licenseNumber_key" ON "doctors_application"("licenseNumber");

-- CreateIndex
CREATE INDEX "_DoctorsApplicationToExpertise_B_index" ON "_DoctorsApplicationToExpertise"("B");

-- AddForeignKey
ALTER TABLE "doctors_application" ADD CONSTRAINT "doctors_application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoctorsApplicationToExpertise" ADD CONSTRAINT "_DoctorsApplicationToExpertise_A_fkey" FOREIGN KEY ("A") REFERENCES "doctors_application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoctorsApplicationToExpertise" ADD CONSTRAINT "_DoctorsApplicationToExpertise_B_fkey" FOREIGN KEY ("B") REFERENCES "expertise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
